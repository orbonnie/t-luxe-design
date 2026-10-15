import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const intro =
  "Placeholder intro about what T Luxe offers. Every design is customized to your event.";

const services = [
  {
    name: "Balloon Garland",
    description:
      "Organic or spiral garland in your colors, sized to your backdrop or entryway.",
    price: "Starting at $150",
  },
  {
    name: "Balloon Arch",
    description:
      "A statement arch for entrances, photo ops, or dessert tables.",
    price: "Starting at $250",
  },
  {
    name: "Table Centerpieces",
    description: "Balloon and floral-accent centerpieces sold by the table.",
    price: "Starting at $35 each",
  },
  {
    name: "Full Event Styling",
    description:
      "Complete decor design, delivery, setup, and breakdown for your event.",
    price: "Custom quote",
  },
];

export default function ServicesPage() {
  return (
    <main className="pb-8">
      <PageHeader title="Services" intro={intro} />

      <section className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.name}
            className="overflow-hidden rounded-3xl border border-plum/10 bg-white"
          >
            <div className="aspect-video bg-linear-to-br from-bloom/30 to-iris/30" />
            <div className="p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-2xl text-plum">{s.name}</h2>
                <p className="shrink-0 text-sm uppercase tracking-widest text-bloom">
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
          className="mt-6 inline-block rounded-full bg-bloom px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-cherry"
        >
          Request a Quote
        </Link>
      </section>
    </main>
  );
}
