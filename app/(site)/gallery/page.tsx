import { sanityFetch } from "../../../sanity/lib/live";
import { groq } from "next-sanity";
import PageHeader from "@/components/PageHeader";
import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";

const galleryQuery = groq`
  *[_type == "gallery"][0] {
    "galleryHeading": heading,
    "galleryIntro": introText,
    "galleryItems": galleryItems[] {
      "id": _key,
      "src": image.asset->url,
      caption,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  }
`;

type galleryData = {
  galleryHeading: string | null;
  galleryIntro: string | null;
  galleryItems: GalleryItem[] | null;
};

// Mixed shapes on purpose, so you can see the masonry layout working
const items: GalleryItem[] = [
  { id: "1", caption: "Organic garland", width: 800, height: 1000 },
  { id: "2", caption: "Dessert table", width: 1200, height: 800 },
  { id: "3", caption: "Entrance arch", width: 800, height: 1200 },
  { id: "4", caption: "Baby shower", width: 1000, height: 1000 },
  { id: "5", caption: "Birthday backdrop", width: 800, height: 1000 },
  { id: "6", caption: "Centerpieces", width: 1200, height: 800 },
  { id: "7", caption: "Wedding install", width: 800, height: 1200 },
  { id: "8", caption: "Photo wall", width: 1000, height: 1000 },
  { id: "9", caption: "Graduation", width: 1200, height: 800 },
];

export default async function Gallery() {
  const { data } = await sanityFetch({
    query: galleryQuery,
  });

  const galleryData = data as galleryData | null;

  const galleryHeading = galleryData?.galleryHeading ?? "Placeholder";
  const galleryIntro = galleryData?.galleryIntro ?? "Placeholder";
  const galleryItems = galleryData?.galleryItems ?? items;

  return (
    <main className="pb-8">
      <PageHeader title={galleryHeading} intro={galleryIntro} />
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <GalleryGrid items={galleryItems} />
      </section>
    </main>
  );
}
