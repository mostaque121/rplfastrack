export default function HeroSection() {
  return (
    <div>
      <section className="relative flex h-[60vh] flex-col items-center justify-center text-center">
        <div className="qualification-hero" />
        <div className="relative z-10 container max-w-5xl px-4 md:px-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tighter text-emerald-400 sm:text-5xl md:text-6xl">
            Recognition of Prior Learning Services
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-white/90">
            Turn your experience into nationally recognized qualifications through our streamlined
            RPL process
          </p>
        </div>
      </section>
    </div>
  );
}
