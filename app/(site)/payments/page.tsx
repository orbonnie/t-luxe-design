import PageHeader from "@/components/PageHeader";
import CopyButton from "@/components/CopyButton";

type PaymentMethod = {
  name: string;
  handle?: string; // shown on the page, and copied if there's no link
  href?: string; // if present, renders a "Pay" button
  note?: string;
};

const intro =
  "Placeholder intro about how to pay. Choose whichever method is easiest for you.";

const methods: PaymentMethod[] = [
  {
    name: "Venmo",
    handle: "@REPLACE_ME",
    href: "https://venmo.com/u/REPLACE_ME",
  },
  {
    name: "Cash App",
    handle: "$REPLACE_ME",
    href: "https://cash.app/$REPLACE_ME",
  },
  {
    name: "PayPal",
    handle: "paypal.me/REPLACE_ME",
    href: "https://paypal.me/REPLACE_ME",
  },
  {
    name: "Zelle",
    handle: "REPLACE_ME@email.com",
    note: "Send from your bank’s app using this email or phone number.",
  },
  {
    name: "Apple Pay",
    handle: "(000) 000-0000",
    note: "Send with Apple Cash through the Messages app.",
  },
];

export default function PaymentPage() {
  return (
    <main className="pb-8">
      <PageHeader title="Payment" intro={intro} />

      <ul className="mx-auto mt-16 max-w-3xl space-y-4 px-6">
        {methods.map((m) => (
          <li
            key={m.name}
            className="flex flex-col gap-4 rounded-2xl border border-champagne bg-iris/10 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-display text-2xl text-plum">{m.name}</h2>
              {m.handle && <p className="mt-1 opacity-80">{m.handle}</p>}
              {m.note && <p className="mt-1 text-sm opacity-60">{m.note}</p>}
            </div>

            {m.href ? (
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-bloom/90 px-6 py-2.5 text-center text-xs uppercase tracking-widest text-white transition-colors hover:bg-iris/90 hover:border hover:border-white"
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
