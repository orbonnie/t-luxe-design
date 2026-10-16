"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  values?: Record<string, string>;
};

const field = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Spam trap: real people never see or fill this hidden field
  if (field(formData, "ref_code"))
    return { status: "success", message: "Thank you!" };

  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    eventType: field(formData, "eventType"),
    eventDate: field(formData, "eventDate"),
    message: field(formData, "message"),
  };

  if (!values.name || !values.email || !values.message) {
    return {
      status: "error",
      message: "Please fill in your name, email, and message.",
      values,
    };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    return {
      status: "error",
      message: "That email address doesn’t look right.",
      values,
    };
  }
  if (values.message.length > 5000) {
    return {
      status: "error",
      message: "That message is a bit long. Please shorten it.",
      values,
    };
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!process.env.RESEND_API_KEY || !to || !from) {
    console.error(
      "Contact form: missing RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL",
    );
    return {
      status: "error",
      message: "Something went wrong. Please email us directly instead.",
      values,
    };
  }

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: values.email,
    subject: `New inquiry from ${values.name.replace(/[\r\n]+/g, " ")}`,
    text: [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Event type: ${values.eventType || "Not specified"}`,
      `Event date: ${values.eventDate || "Not specified"}`,
      "",
      values.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please email us directly instead.",
      values,
    };
  }

  return { status: "success", message: "Thank you! We’ll be in touch soon." };
}
