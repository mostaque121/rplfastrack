import { auth, signIn, signOut } from "@/auth";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default async function page() {
  const session = await auth();
  if (session?.user)
    return (
      <section className="bg-[#16152f] h-[100vh] flex justify-center items-center">
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

          <h1 className="text-3xl font-bold mb-2 text-white">
            Welcome, {session.user.name}!
          </h1>
          <h2 className="text-muted text-lg">
            User Role : {session.user.role}
          </h2>

          {session.user.role !== "user" && (
            <Link href={"/admin"}>
              <button
                type="submit"
                className="flex  justify-center z-10 gap-5 cursor-pointer overflow-hidden border-2 group-hover:shadow-lg group-hover:shadow-[#32306d] border-gray-400 p-4 relative rounded-full text-white font-bold before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-linear-115 before:from-[#4f4cad] before:to-[#64E9FF] before:transition-all before:duration-500 before:-z-1 clip-path-custom
    "
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
              await signOut();
            }}
          >
            <button
              type="submit"
              className="flex justify-center z-10 gap-5 cursor-pointer overflow-hidden border-2 group-hover:shadow-lg group-hover:shadow-[#32306d] border-gray-400 p-4 relative rounded-full text-white font-bold before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-linear-115 before:from-[#4f4cad] before:to-[#64E9FF] before:transition-all before:duration-500 before:-z-1 clip-path-custom
    "
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
      <div className="md:w-96 w-full h-screen overflow-y-scroll scrollbar-hidden md:px-8 px-5 pt-8 pb-10">
        <h1>RPLFASRTRACK</h1>
        <h1 className="text-3xl mt-12 md:mt-8">Sign in to your account</h1>

        <div className="md:w-80 w-full mt-6 ">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              className="flex items-center shadow-md justify-center w-full h-14 md:h-12 bg-gray-100 hover:bg-light-gray-hover active:bg-light-gray-active rounded-lg hover:bg-gray-200 transition duration-300"
              type="submit"
            >
              Signin with Google
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 hidden md:block relative">
        <Image
          fill
          className="w-full h-screen object-cover"
          src="/signinbg.webp"
          alt="Background"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Text Overlay */}
        <div className="absolute ml-20 max-w-96 inset-0 flex flex-col items-start justify-center">
          <h1 className="text-4xl text-white font-bold">
            Recognize Your Skills and Experience Through RPL
          </h1>
          <p className="text-light-gray text-lg mt-7">
            Unlock new opportunities by showcasing your existing knowledge and
            competencies, allowing you to gain recognition for what you’ve
            learned outside traditional education.
          </p>
          <div className="flex items-center cursor-pointer text-blue-300  hover:text-blue-200 duration-200 ease-in transition-all mt-12">
            <p className="text-xl underline text font-semibold">Home</p>
            <MoveRight className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
