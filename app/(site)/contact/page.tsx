import { sanityFetch } from "../../../sanity/lib/live";
import { groq } from "next-sanity";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";

const contactQuery = groq`
  *[_type == "contact"][0] {
    "contactHeading": heading,
    "contactIntro": introText,
    address,
    phone,
    email,
    hours
  }
`;

type ContactData = {
  contactHeading: string;
  contactIntro: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
};

const labelClass = "text-sm uppercase tracking-widest text-bloom/90";

export default async function ContactPage() {
  const { data } = await sanityFetch({
    query: contactQuery,
  });

  const contactData = (data as ContactData) || null;

  const contactHeading = contactData?.contactHeading || "Placeholder";
  const contactIntro = contactData?.contactIntro || "Placeholder";
  const address = contactData?.address || "Placeholder";
  const phone = contactData?.phone || "Placeholder";
  const email = contactData?.email || "Placeholder";
  const hours = contactData?.hours || "Placeholder";

  return (
    <main className="pb-8">
      <PageHeader title={contactHeading} intro={contactIntro} />

      <div className="mx-auto mt-16 grid max-w-6xl gap-12 px-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <ContactForm />
        </div>
        <aside className="space-y-8 md:col-span-2">
          <div>
            <p className={labelClass}>Phone</p>
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="mt-1 block font-display text-2xl text-plum hover:text-bloom/90"
            >
              {phone}
            </a>
          </div>
          <div>
            <p className={labelClass}>Email</p>
            <a
              href={`mailto:${email}`}
              className="mt-1 block font-display text-2xl text-plum hover:text-bloom/90"
            >
              {email}
            </a>
          </div>
          <div>
            <p className={labelClass}>Location</p>
            <p className="mt-1 opacity-80">{address}</p>
          </div>
          <div>
            <p className={labelClass}>Hours</p>
            <p className="mt-1 whitespace-pre-line opacity-80">{hours}</p>
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
