import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900">Get in Touch</h2>
      <p className="mt-4 text-lg text-gray-500">
        Have questions about RPL or ready to start your assessment? Our team is
        here to help you every step of the way.
      </p>

      <div className="mt-8 space-y-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <Phone className="h-6 w-6" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Phone
            </h3>
            <p className="mt-2 text-base text-gray-500">
              1300 RPL HELP (1300 775 435)
            </p>
            <p className="text-base text-gray-500">
              International: +61 2 8005 6001
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <Mail className="h-6 w-6" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Email
            </h3>
            <p className="mt-2 text-base text-gray-500">
              info@rplassessments.com
            </p>
            <p className="text-base text-gray-500">
              support@rplassessments.com
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Office Location
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Level 10, 123 Business Street
            </p>
            <p className="text-base text-gray-500">Sydney, NSW 2000</p>
            <p className="text-base text-gray-500">Australia</p>
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Office Hours
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Monday - Friday: 9:00 AM - 5:00 PM
            </p>
            <p className="text-base text-gray-500">Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
