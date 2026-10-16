import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

// Same shape as the `contact` Sanity schema
const contact = {
  introText:
    "Placeholder intro. Tell us about your event and we’ll get back to you.",
  address: "Roswell, GA",
  phone: "(973) 332-8686",
  email: "hello@tluxedecor.com",
  hours: "Mon–Fri: 9am–5pm\nSat: By appointment",
};

const labelClass = "text-sm uppercase tracking-widest text-bloom/90";

export default function ContactPage() {
  return (
    <main className="pb-8">
      <PageHeader title="Contact" intro={contact.introText} />

      <div className="mx-auto mt-16 grid max-w-6xl gap-12 px-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <ContactForm />
        </div>
        <aside className="space-y-8 md:col-span-2">
          <div>
            <p className={labelClass}>Phone</p>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="mt-1 block font-display text-2xl text-plum hover:text-bloom/90"
            >
              {contact.phone}
            </a>
          </div>
          <div>
            <p className={labelClass}>Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block font-display text-2xl text-plum hover:text-bloom/90"
            >
              {contact.email}
            </a>
          </div>
          <div>
            <p className={labelClass}>Location</p>
            <p className="mt-1 opacity-80">{contact.address}</p>
          </div>
          <div>
            <p className={labelClass}>Hours</p>
            <p className="mt-1 whitespace-pre-line opacity-80">
              {contact.hours}
            </p>
          </div>
          <div>
            <p className={`${labelClass} mb-3`}>Follow along</p>
            <SocialLinks />
          </div>
        </aside>
      </div>
    </main>
  );
}
