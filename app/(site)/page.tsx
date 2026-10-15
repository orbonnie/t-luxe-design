import Link from "next/link";

const hero = {
  heading: "Balloons & Events, Elevated",
  subheading: "Sophisticated styling with a playful pop.",
  image: "/t-luxe-hero.jpg",
};

const about = {
  heading: "About T Luxe",
  body: "Placeholder text about the business, the owner, and what makes their work special. Replace this with the real story.",
};

const testimonials = [
  {
    quote: "Placeholder testimonial one.",
    author: "Client Name",
    event: "Baby Shower",
  },
  {
    quote: "Placeholder testimonial two.",
    author: "Client Name",
    event: "Birthday",
  },
  {
    quote: "Placeholder testimonial three.",
    author: "Client Name",
    event: "Wedding",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="aspect-16/7 w-full rounded-3xl bg-linear-to-br from-bloom via-plum to-iris" />
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <h1 className="font-display text-5xl leading-tight text-plum md:text-6xl">
            {hero.heading}
          </h1>
          <p className="mt-4 text-lg opacity-80">{hero.subheading}</p>
          <Link
            href="/gallery"
            className="mt-8 inline-block rounded-full bg-bloom px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-cherry"
          >
            View Our Work
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto mt-28 grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="aspect-4/5 rounded-3xl bg-plum/15" />
        <div>
          <h2 className="font-display text-4xl text-plum">{about.heading}</h2>
          <div className="mt-2 h-1 w-16 rounded bg-bloom" />
          <p className="mt-6 leading-relaxed opacity-80">{about.body}</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-28 bg-iris py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-4xl">Kind Words</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={i} className="rounded-2xl bg-white/10 p-8">
                <blockquote className="font-display text-xl leading-snug">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm uppercase tracking-widest opacity-80">
                  {t.author} · {t.event}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
