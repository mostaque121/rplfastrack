export default function ContactHero() {
  return (
    <section className="relative flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="contact-hero" />
      <div className="relative z-10 container px-4 md:px-6 max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-emerald-400 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
          Have questions or ready to get started? Our RPL specialists are here
          to guide you every step of the way.
        </p>
      </div>
    </section>
  );
}
