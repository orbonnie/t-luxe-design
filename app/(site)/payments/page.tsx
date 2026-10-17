import { sanityFetch } from "../../../sanity/lib/live";
import { groq } from "next-sanity";
import PageHeader from "@/components/PageHeader";
import CopyButton from "@/components/CopyButton";

const paymentQuery = groq`
  *[_type == "paymentMethods"][0] {
    "paymentHeading": heading,
    "paymentIntro": intro,
    "paymentMethods": methods[] {
      name,
      link,
      handle,
      note
    }
  }
`;

type PaymentMethod = {
  name: string;
  handle?: string; // shown on the page, and copied if there's no link
  link?: string; // if present, renders a "Pay" button
  note?: string;
};

type PaymentData = {
  paymentHeading: string;
  paymentIntro: string;
  paymentMethods: PaymentMethod[] | null;
};

export default async function PaymentPage() {
  const { data } = await sanityFetch({
    query: paymentQuery,
  });

  const paymentData = (data as PaymentData) || null;

  const paymentHeading = paymentData?.paymentHeading ?? "Placeholder";
  const paymentIntro = paymentData?.paymentIntro ?? "Placeholder";
  const paymentMethods = paymentData?.paymentMethods ?? [];

  return (
    <main className="pb-8">
      <PageHeader title={paymentHeading} intro={paymentIntro} />

      <ul className="mx-auto mt-16 max-w-3xl space-y-4 px-6">
        {paymentMethods.map((m) => (
          <li
            key={m.name}
            className="flex flex-col gap-4 rounded-2xl border border-champagne bg-iris/10 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-display text-2xl text-plum">{m.name}</h2>
              {m.handle && <p className="mt-1 opacity-80">{m.handle}</p>}
              {m.note && <p className="mt-1 text-sm opacity-60">{m.note}</p>}
            </div>

            {m.link ? (
              <a
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-bloom/80 px-6 py-2.5 text-center text-xs uppercase tracking-widest text-white transition-colors hover:bg-iris/90 hover:border hover:border-white"
              >
                Pay with {m.name}
              </a>
            ) : (
              m.handle && <CopyButton value={m.handle} />
            )}
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-10 max-w-3xl px-6 text-center text-sm opacity-70">
        Placeholder: add any payment terms here (deposit, due date, what to put
        in the payment note).
      </p>
    </main>
  );
}
