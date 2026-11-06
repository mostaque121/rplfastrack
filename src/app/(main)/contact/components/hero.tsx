import { Breadcrumbs } from "@/components/sections/breadcrumbs";

/**
 * Contact hero: the same dark navy as the other heroes, kept short. Just breadcrumbs, the H1
 * and one line of text, because the form sits right below. The navbar is transparent on top of
 * it (see DARK_HERO_PATHS in the navbar), so the top padding includes the navbar height.
 */
export default function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-[38%] bg-white/6 [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)] lg:block"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 left-1/4 -z-10 size-72 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="container mx-auto px-4 pt-28 pb-10 md:px-8 md:pt-32 md:pb-14">
        <div className="max-w-2xl space-y-4">
          <div className="[&_a]:text-brand-bright [&_a:hover]:text-white [&_li>span]:text-slate-300 [&_svg]:text-slate-400">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          </div>
          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance text-white md:text-5xl">
            Contact <span className="text-brand-bright">RPL Fast Track</span>
          </h1>
          <p className="text-lg text-slate-300">
            Questions about RPL or ready to get started? Call, email or send us a message and an RPL
            consultant will get back to you.
          </p>
        </div>
      </div>
    </section>
  );
}
