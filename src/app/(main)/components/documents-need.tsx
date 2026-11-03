import {
  FaBriefcase,
  FaFileAlt,
  FaGraduationCap,
  FaIdCard,
} from "react-icons/fa";

const documents = [
  {
    id: "id",
    title: "100 Points ID",
    icon: <FaIdCard className="w-8 h-8 text-emerald-500" />,
    description:
      "Includes documents like your passport, driver’s licence, Medicare card, or visa that add up to 100 points of identification.",
  },
  {
    id: "education",
    title: "Education Certificates",
    icon: <FaGraduationCap className="w-8 h-8 text-emerald-500" />,
    description:
      "Copies of your school, college, or training certificates like diplomas, transcripts, or qualifications.",
  },
  {
    id: "experience",
    title: "Work Experience",
    icon: <FaBriefcase className="w-8 h-8 text-emerald-500" />,
    description:
      "Details about your past jobs—what you did, where you worked, and what skills you used or learned.",
  },
  {
    id: "otherDocs",
    title: "Supporting Documents",
    icon: <FaFileAlt className="w-8 h-8 text-emerald-500" />,
    description:
      "Extra documents that help your RPL case, like reference letters, photos, or work samples.",
  },
];

export default function DocumentsNeed() {
  return (
    <section className=" bg-white py-16 md:py-24 space-y-8">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Required <span className="text-emerald-600">Documents</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              These are the key documents you&apos;ll need to submit for your
              RPL application.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start rounded-lg shadow-md p-5 border-l-4 bg-[#F5F7FA] hover:-translate-y-1 border-emerald-500 duration-300 hover:shadow-xl transition-all"
            >
              <div className="flex-shrink-0">{doc.icon}</div>
              <div className="ml-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {doc.title}
                </h3>
                <p className="text-gray-700 md:text-lg mt-1">
                  {doc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
