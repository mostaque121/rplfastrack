export default function Stats() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Impact</h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            We&apos;ve helped thousands of individuals transform their experience into
            qualifications
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 px-4 pt-5 pb-6 text-center">
              <div className="text-4xl font-extrabold text-blue-600">12,000+</div>
              <div className="mt-2 text-lg font-medium text-gray-900">Qualifications Awarded</div>
            </div>

            <div className="rounded-lg bg-blue-50 px-4 pt-5 pb-6 text-center">
              <div className="text-4xl font-extrabold text-blue-600">98%</div>
              <div className="mt-2 text-lg font-medium text-gray-900">Client Satisfaction</div>
            </div>

            <div className="rounded-lg bg-blue-50 px-4 pt-5 pb-6 text-center">
              <div className="text-4xl font-extrabold text-blue-600">50+</div>
              <div className="mt-2 text-lg font-medium text-gray-900">Industry Experts</div>
            </div>

            <div className="rounded-lg bg-blue-50 px-4 pt-5 pb-6 text-center">
              <div className="text-4xl font-extrabold text-blue-600">200+</div>
              <div className="mt-2 text-lg font-medium text-gray-900">Qualifications Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
