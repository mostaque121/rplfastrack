import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function ContactInfo() {
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const address = process.env.NEXT_PUBLIC_ADDRESS;
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900">Get in Touch</h2>
      <p className="mt-4 text-lg text-gray-500">
        Have questions about RPL or ready to start your assessment? Our team is
        here to help you every step of the way.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-8">
        {/* Phone */}
        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
          <a
            href={`tel:${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <div className="bg-indigo-500 rounded-md p-3">
                <FaPhoneAlt className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Phone
                  </dt>
                  <dd className="text-lg font-medium  text-blue-600 hover:text-blue-800">
                    {phoneNumber}
                  </dd>
                </dl>
              </div>
            </div>
          </a>
        </div>

        {/* Email */}
        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <div className="bg-green-500 rounded-md p-3">
                <FaEnvelope className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Email
                  </dt>
                  <dd className="text-lg font-medium  text-blue-600 hover:text-blue-800">
                    {email}
                  </dd>
                </dl>
              </div>
            </div>
          </a>
        </div>

        {/* WhatsApp */}
        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
          <a
            href={`https://wa.me/${whatsAppNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <div className="bg-green-400 rounded-md p-3">
                <FaWhatsapp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    WhatsApp
                  </dt>
                  <dd className="text-lg font-medium  text-blue-600 hover:text-blue-800">
                    {whatsAppNumber}
                  </dd>
                </dl>
              </div>
            </div>
          </a>
        </div>
        {/* Address (No link) */}
        <div className="bg-white overflow-hidden shadow-lg rounded-lg">
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <div className="bg-red-600 rounded-md p-3">
              <FaLocationDot className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Address
                </dt>
                <dd className="text-lg font-medium text-gray-900">{address}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
