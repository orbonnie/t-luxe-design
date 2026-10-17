import { sanityFetch } from "../../../sanity/lib/live";
import { groq } from "next-sanity";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

type Service = {
  name: string;
  description?: string;
  price?: string;
  image?: string;
};

const servicesQuery = groq`
  *[_type == "services"][0]{
    "servicesHeading": heading,
    "servicesIntro": introText,
    "services": serviceList[] {
      name,
      description,
      price,
      "src": image.asset->url
    }
  }
`;

type servicesData = {
  servicesHeading: string | null;
  servicesIntro: string | null;
  services: Service[] | null;
};

export default async function ServicesPage() {
  const { data } = await sanityFetch({
    query: servicesQuery,
  });

  const servicesData = (data as servicesData) || null;

  const servicesHeading = servicesData?.servicesHeading ?? "Placeholder";
  const servicesIntro = servicesData?.servicesIntro ?? "Placeholder";
  const services = servicesData?.services ?? [];

  return (
    <main className="pb-8">
      <PageHeader title={servicesHeading} intro={servicesIntro} />

      <section className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.name}
            className="overflow-hidden rounded-3xl border border-champagne bg-iris/10"
          >
            <div className="aspect-video bg-linear-to-br from-bloom/30 to-iris/30" />
            <div className="p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-plum text-[clamp(1.25rem,0.9rem+1vw,1.5rem)]">
                  {s.name}
                </h2>
                <p className="shrink-0 text-[clamp(0.75rem,0.667rem+0.333vw,0.875rem)] uppercase tracking-widest text-bloom">
                  {s.price}
                </p>
              </div>
              <p className="mt-3 leading-relaxed opacity-80">{s.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-2xl px-6 text-center">
        <p className="font-display text-2xl text-plum">
          Don&apos;t see what you&apos;re looking for?
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-bloom/90 px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-iris/90"
        >
          Request a Quote
        </Link>
      </section>
    </main>
  );
}
