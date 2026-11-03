export default function ReviewHero() {
  return (
    <section className="relative flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="review-hero hero" />
      <div className="relative z-10 container px-4 md:px-6 max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-emerald-400 mb-4">
          What Our Clients Say
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
          Real experiences from clients who advanced their careers through our
          RPL Fast Track program. Discover their stories of growth, success, and
          transformation.
        </p>
      </div>
    </section>
  );
}
