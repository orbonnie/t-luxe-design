import { defineType, defineField } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Contact",
    }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "introText", title: "Intro Text", type: "text" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "hours", title: "Hours", type: "text" }),
  ],
});
