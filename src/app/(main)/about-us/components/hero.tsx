export default function HeroAboutUs() {
  return (
    <section className="relative flex h-[60vh] flex-col items-center justify-center text-center">
      <div className="about-us-hero" />
      <div className="relative z-10 container max-w-5xl px-4 md:px-6">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter text-brand-bright sm:text-5xl md:text-6xl">
          About Us
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-white/90">
          Empowering individuals through Recognition of Prior Learning—because your experience
          deserves to be recognized.
        </p>
      </div>
    </section>
  );
}
