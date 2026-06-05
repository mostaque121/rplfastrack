import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-6 shadow-sm"
        action={async (formData: FormData) => {
          "use server";

          const newPassword = String(formData.get("newPassword") || "");

          await auth.api.setPassword({
            body: { newPassword },
            headers: await headers(),
          });
        }}
      >
        <label className="flex flex-col gap-2 text-sm font-medium">
          New password
          <input
            name="newPassword"
            type="password"
            required
            minLength={8}
            className="rounded-md border px-3 py-2"
            placeholder="Enter a new password"
          />
        </label>

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Set password
        </button>
      </form>
    </main>
  );
}
