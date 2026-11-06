import { Accent, SectionHeading } from "./section-heading";

import { RPL_STEPS } from "./rpl-steps";

/** Dark section with a vertical timeline. The id is the target of the hero's "See the RPL process" link. */
export function RplProcess() {
  return (
    <section
      id="rpl-process"
      className="relative isolate scroll-mt-16 overflow-hidden bg-ink py-14 md:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-[35%] bg-white/6 [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)] lg:block"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 -z-10 size-96 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="The RPL process"
          title={
            <>
              How RPL works in <Accent tone="dark">four steps</Accent>
            </>
          }
          description="A clear path from your first call to your certificate."
        />

        <ol className="relative mt-12 max-w-3xl space-y-6">
          {/* Vertical line through the step badges. */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-6 w-px bg-linear-to-b from-brand-bright via-white/20 to-transparent"
          />
          {RPL_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative flex gap-5">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-bright text-ink shadow-lg shadow-brand-bright/20">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
                  <p className="text-sm font-semibold tracking-wider text-brand-bright uppercase">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-slate-300">{step.long}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
