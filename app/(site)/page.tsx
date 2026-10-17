import { sanityFetch } from "../../sanity/lib/live";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const homepageQuery = groq`
  *[_type == "homepage"][0] {
    "heroImageUrl": heroImage.asset->url,
    heroHeading,
    heroSubheading,
    aboutHeading,
    "aboutText": array::join(aboutText[].children[].text, " "),
    "aboutImageUrl": aboutImage.asset->url,
    testimonials[] {
      quote,
      authorName,
      eventType
    }
  }
`;

type HomepageData = {
  heroImageUrl: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  aboutHeading: string | null;
  aboutText: string | null;
  aboutImageUrl: string | null;
  testimonials:
    | {
        quote?: string;
        authorName?: string;
        eventType?: string;
      }[]
    | null;
};

export default async function Home() {
  const { data } = await sanityFetch({
    query: homepageQuery,
  });

  const homepageData = data as HomepageData | null;

  const heroImage = homepageData?.heroImageUrl ?? "/gold-balloons.png";
  const heroHeading =
    homepageData?.heroHeading ?? "Balloons & Events, Elevated";
  const heroSubheading =
    homepageData?.heroSubheading ?? "Sophisticated styling with a playful pop.";
  const aboutImage = homepageData?.aboutImageUrl ?? null;
  const aboutHeading = homepageData?.aboutHeading ?? "Placeholder";
  const aboutText = homepageData?.aboutText ?? "Placeholder";
  const testimonials = homepageData?.testimonials ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="relative aspect-16/7 w-full overflow-hidden rounded-3xl bg-linear-to-br from-bloom via-plum to-iris">
          <Image
            src={heroImage}
            alt="T Luxe balloon and event decor"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-bloom/10 via-plum/30 to-iris/40" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <h1 className="font-display text-5xl leading-tight text-plum md:text-6xl">
            {heroHeading}
          </h1>
          <p className="mt-4 text-lg opacity-80">{heroSubheading}</p>
          <Link
            href="/gallery"
            className="mt-8 inline-block rounded-full bg-bloom/90 px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-iris/90"
          >
            View Our Work
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto mt-28 grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-plum/15">
          {aboutImage && (
            <Image
              src={aboutImage}
              alt="T Luxe event decor"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div>
          <h2 className="font-display text-4xl text-plum">{aboutHeading}</h2>
          <div className="mt-2 h-1 w-16 rounded bg-cherry" />
          <p className="mt-6 leading-relaxed opacity-80">{aboutText}</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-28 bg-iris py-20 text-powder">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-4xl">Kind Words</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={i} className="rounded-2xl bg-white/10 p-8">
                <blockquote className="font-display text-xl leading-snug">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm uppercase tracking-widest opacity-80">
                  {t.authorName} · {t.eventType}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
