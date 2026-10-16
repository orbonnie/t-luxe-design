"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/(site)/contact/actions";

const eventTypes = [
  "Birthday",
  "Baby Shower",
  "Wedding",
  "Corporate",
  "Graduation",
  "Other",
];

const labelClass = "block text-xs uppercase tracking-widest text-plum";
const inputClass =
  "mt-2 w-full rounded-xl border border-plum/20 bg-white px-4 py-3 outline-none transition-colors focus:border-bloom/90";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContact,
    {
      status: "idle",
    },
  );

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-plum/10 bg-white p-10 text-center">
        <p className="font-display text-3xl text-plum">{state.message}</p>
      </div>
    );
  }

  const v = state.values ?? {};

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-3xl border border-champagne bg-iris/20 p-8"
    >
      {/* Spam trap, hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Reference code
          <input type="text" name="ref_code" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name*
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={v.name}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={v.email}
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event type
          </label>
          <select
            id="eventType"
            name="eventType"
            defaultValue={v.eventType ?? ""}
            className={inputClass}
          >
            <option value="">Select one</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            defaultValue={v.eventDate}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about your event*
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={v.message}
          className={inputClass}
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-cherry">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-bloom/90 px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-iris disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
