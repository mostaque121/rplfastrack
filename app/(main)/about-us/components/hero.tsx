export default function HeroAboutUs() {
  return (
    <section className="relative flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="about-us-hero" />
      <div className="relative z-10 container px-4 md:px-6 max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-emerald-400 mb-4">
          About Us
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
          Empowering individuals through Recognition of Prior Learning—because
          your experience deserves to be recognized.
        </p>
      </div>
    </section>
  );
}
