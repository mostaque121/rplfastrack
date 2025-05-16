import { FaBolt, FaHandsHelping, FaUserTie } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { GiBullseye } from "react-icons/gi";
import { MdVerifiedUser } from "react-icons/md";

const features = [
  {
    id: 1,
    icon: <FaUserTie className="h-6 w-6" />,
    title: "Expert Guidance",
    description:
      "Our experienced RPL consultants provide personalized support throughout the entire process, ensuring a smooth and stress-free experience.",
  },
  {
    id: 2,
    icon: <FaBolt className="h-6 w-6" />,
    title: "Fast and Efficient Process",
    description:
      "We streamline the RPL process, making it quick and easy for you to receive certification.",
  },
  {
    id: 3,
    icon: <FaSackDollar className="h-6 w-6" />,
    title: "Cost-Effective Solution",
    description:
      "Avoid spending time and money on courses you don’t need. With our RPL services, you can save both by getting formal recognition for the skills.",
  },
  {
    id: 4,
    icon: <MdVerifiedUser className="h-6 w-6" />,
    title: "Nationally Recognized Certifications",
    description:
      "The RPL certificates we provide are recognized across the industry, giving you the credentials needed to advance in your career or pursue new opportunities.",
  },
  {
    id: 5,
    icon: <FaHandsHelping className="w-6 h-6" />,
    title: "Comprehensive Support",
    description:
      "From consultation to certification, we are with you every step of the way. Our dedicated team is available to answer any questions.",
  },
  {
    id: 6,
    icon: <GiBullseye className="w-6 h-6" />,
    title: "Proven Success",
    description:
      "We have a track record of successfully helping individuals gain RPL certification, enabling them to achieve their career goals faster.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose <span className="text-emerald-600">Us</span>
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Empowering Through Recognition
            </p>
          </div>
        </div>
        <div className="rounded-md grid md:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-5">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center p-6 rounded-md shadow-md bg-[#F5F7FA] "
            >
              <div className="flex  items-center justify-center h-12 w-12 rounded-md bg-emerald-600 text-white mx-auto">
                {feature.icon}
              </div>

              <h3 className="text-lg mt-5 text-center font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-center text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
