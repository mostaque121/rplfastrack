import { FaBriefcase, FaFileAlt, FaGraduationCap, FaIdCard } from "react-icons/fa";

const documents = [
  {
    id: "id",
    title: "100 Points ID",
    icon: <FaIdCard className="h-8 w-8 text-brand" />,
    description:
      "Includes documents like your passport, driver’s licence, Medicare card, or visa that add up to 100 points of identification.",
  },
  {
    id: "education",
    title: "Education Certificates",
    icon: <FaGraduationCap className="h-8 w-8 text-brand" />,
    description:
      "Copies of your school, college, or training certificates like diplomas, transcripts, or qualifications.",
  },
  {
    id: "experience",
    title: "Work Experience",
    icon: <FaBriefcase className="h-8 w-8 text-brand" />,
    description:
      "Details about your past jobs—what you did, where you worked, and what skills you used or learned.",
  },
  {
    id: "otherDocs",
    title: "Supporting Documents",
    icon: <FaFileAlt className="h-8 w-8 text-brand" />,
    description:
      "Extra documents that help your RPL case, like reference letters, photos, or work samples.",
  },
];

export default function DocumentsNeed() {
  return (
    <section className="space-y-8 bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Required <span className="text-brand">Documents</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              These are the key documents you&apos;ll need to submit for your RPL application.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start rounded-lg border-l-4 border-brand bg-surface p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex-shrink-0">{doc.icon}</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-ink md:text-xl">{doc.title}</h3>
                <p className="mt-1 text-gray-700 md:text-lg">{doc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
