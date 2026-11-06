import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

const SIGN_IN_ERRORS: Record<string, string> = {
  signup_disabled: "This Google account isn't authorised.",
  NOT_AUTHORISED: "This Google account isn't authorised.",
  BANNED_USER: "This account has been suspended.",
};

const buttonBase =
  "flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-4 text-sm font-semibold transition-colors";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.57.37-2.29v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Image
          src="/fav.png"
          alt=""
          width={512}
          height={512}
          sizes="32px"
          className="h-8 w-auto object-contain"
        />
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          RPL Fast Track
        </span>
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-brand-subtle bg-white p-8 shadow-sm">
        {children}
      </div>
      <Link href="/" className="mt-6 text-sm text-ink/60 transition-colors hover:text-brand">
        ← Back to website
      </Link>
    </main>
  );
}

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error
    ? (SIGN_IN_ERRORS[error] ?? "Sign-in failed. Please try again.")
    : null;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    return (
      <Shell>
        <div className="flex flex-col items-center text-center">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt=""
              width={72}
              height={72}
              className="mb-4 size-18 rounded-full border-2 border-brand-subtle"
            />
          )}
          <h1 className="font-display text-xl font-bold text-ink">Welcome, {session.user.name}</h1>
          <p className="mt-1 text-sm text-ink/60 capitalize">{session.user.role}</p>

          <div className="mt-6 flex w-full flex-col gap-3">
            {session.user.role !== "user" && (
              <Link href="/admin" className={`${buttonBase} bg-cta text-white hover:bg-cta-strong`}>
                Go to dashboard
              </Link>
            )}
            <form
              action={async () => {
                "use server";
                await auth.api.signOut({ headers: await headers() });
                redirect("/signin");
              }}
            >
              <button
                type="submit"
                className={`${buttonBase} border border-ink/15 text-ink hover:bg-surface`}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-center font-display text-2xl font-bold text-ink">Admin sign in</h1>
      <p className="mt-2 text-center text-sm text-ink/60">
        Use your authorised Google account to continue.
      </p>

      {errorMessage && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <form
        className="mt-6"
        action={async () => {
          "use server";
          const res = await auth.api.signInSocial({
            body: { provider: "google", errorCallbackURL: "/signin" },
          });
          if (res.url) {
            redirect(res.url);
          }
        }}
      >
        <button
          type="submit"
          className={`${buttonBase} border border-ink/15 bg-white text-ink hover:bg-surface`}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </form>
    </Shell>
  );
}
