import ContactForm from "./components/contact-form";
import ContactInfo from "./components/contact-info";
import ContactHero from "./components/hero";

export default async function ContactUs() {
  return (
    <div className="bg-white">
      <ContactHero />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
