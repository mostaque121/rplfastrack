import "server-only";

export type CrmLead = {
  submissionId: string;
  form: "contact" | "eligibility";
  name: string;
  phone: string;
  email?: string;
  qualification?: string;
  industry?: string;
  experience?: string;
  state?: string;
  message?: string;
  sourceDetail?: string;
  submittedAt?: string;
};

const TIMEOUT_MS = 8000;
const RETRY_DELAYS_MS = [1000, 2000, 4000];

/* ---------------- NETWORK HELPERS ---------------- */

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = TIMEOUT_MS,
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(id);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ---------------- CRM ---------------- */

export async function sendLeadToCrm(lead: CrmLead) {
  const url = process.env.CRM_INTAKE_URL;
  const key = process.env.CRM_INTAKE_KEY;

  if (!url || !key) {
    console.warn(
      "[CRM] CRM_INTAKE_URL or CRM_INTAKE_KEY is not set; skipping lead sync",
    );
    return;
  }

  // Drop empty optional fields so the CRM doesn't receive blank strings
  const body = JSON.stringify(
    Object.fromEntries(
      Object.entries(lead).filter(([, v]) => v !== undefined && v !== ""),
    ),
  );

  // 1 initial attempt + up to 3 retries (1s, 2s, 4s)
  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) await sleep(RETRY_DELAYS_MS[attempt - 1]);

    let response: Response;
    try {
      response = await fetchWithTimeout(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body,
      });
    } catch (error) {
      // Network error or timeout: retryable
      console.error(
        `[CRM] Request failed (attempt ${attempt + 1})`,
        "network",
        error instanceof Error ? error.message : error,
      );
      continue;
    }

    if (response.ok) return;

    const text = await response.text().catch(() => "");

    if (response.status === 401) {
      console.error(
        "[CRM] Unauthorized: CRM_INTAKE_KEY is wrong or missing",
        response.status,
        text,
      );
      return;
    }

    if (response.status >= 400 && response.status < 500) {
      console.error(
        `[CRM] Lead rejected (submissionId ${lead.submissionId})`,
        response.status,
        text,
      );
      return;
    }

    console.error(
      `[CRM] Server error (attempt ${attempt + 1})`,
      response.status,
      text,
    );
  }

  console.error(
    `[CRM] Giving up after ${RETRY_DELAYS_MS.length + 1} attempts (submissionId ${lead.submissionId})`,
    "failed",
    "",
  );
}
