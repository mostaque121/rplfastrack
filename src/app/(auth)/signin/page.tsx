import { MoveRight } from "lucide-react";
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
  if (session?.user)
    return (
      <section className="flex h-screen items-center justify-center bg-[#16152f]">
        <div className="flex flex-col items-center gap-4">
          {session.user.image && (
            <div className="mb-6 flex justify-center">
              <Image
                src={session.user.image}
                alt="Admin Profile"
                width={100}
                height={100}
                className="rounded-full border-4 border-indigo-500 shadow-lg"
              />
            </div>
          )}

          <h1 className="mb-2 text-3xl font-bold text-white">Welcome, {session.user.name}!</h1>
          <h2 className="text-lg text-muted">User Role : {session.user.role}</h2>

          {session.user.role !== "user" && (
            <Link href={"/admin"}>
              <button
                type="submit"
                className="clip-path-custom relative z-10 flex cursor-pointer justify-center gap-5 overflow-hidden rounded-full border-2 border-gray-400 p-4 font-bold text-white group-hover:shadow-lg group-hover:shadow-[#32306d] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:-z-1 before:bg-linear-115 before:from-[#4f4cad] before:to-[#64E9FF] before:transition-all before:duration-500 before:content-['']"
                title="Google"
              >
                <span>Dashboard</span>
              </button>
            </Link>
          )}

          <form
            className="group beforeForm"
            action={async () => {
              "use server";
              await auth.api.signOut({
                headers: await headers(),
              });
            }}
          >
            <button
              type="submit"
              className="clip-path-custom relative z-10 flex cursor-pointer justify-center gap-5 overflow-hidden rounded-full border-2 border-gray-400 p-4 font-bold text-white group-hover:shadow-lg group-hover:shadow-[#32306d] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:-z-1 before:bg-linear-115 before:from-[#4f4cad] before:to-[#64E9FF] before:transition-all before:duration-500 before:content-['']"
              title="Google"
            >
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </section>
    );

  return (
    <div className="flex h-screen w-full">
      <div className="h-screen w-full px-5 pt-8 pb-10 md:w-96 md:px-8">
        <div className="flex items-center">
          <Link
            href="/"
            className="mr-8 flex items-center gap-1 text-base font-semibold md:text-lg"
          >
            <Image
              src={"/fav.png"}
              sizes="28px"
              alt="logo"
              width={512}
              height={512}
              className="h-6 w-auto object-contain md:h-7"
            />
            <span className="tracking-tight text-emerald-600">RPL FAST TRACK</span>
          </Link>
        </div>
        <h1 className="mt-12 text-3xl md:mt-8">Sign in to your account</h1>

        <div className="mt-6 w-full">
          {errorMessage && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}
          <form
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
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-emerald-100 shadow-md transition duration-300 hover:bg-emerald-200 active:bg-emerald-300 md:h-12"
              type="submit"
            >
              Signin with Google
            </button>
          </form>
        </div>
      </div>
      <div className="relative hidden flex-1 md:block">
        <div className="auth-bg hero" />
        <div className="relative z-10">
          <div className="ml-20 flex h-screen max-w-96 flex-col items-start justify-center">
            <h1 className="text-4xl font-bold text-white">
              Recognize Your Skills and Experience Through RPL
            </h1>
            <p className="mt-7 text-lg text-gray-100">
              Unlock new opportunities by showcasing your existing knowledge and competencies,
              allowing you to gain recognition for what you’ve learned outside traditional
              education.
            </p>
            <Link href={"/"}>
              <div className="mt-12 flex cursor-pointer items-center gap-2 text-blue-300 transition-all duration-200 ease-in hover:text-blue-200">
                <p className="text text-xl font-semibold underline">Home</p>
                <MoveRight className="h-8 w-8" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
