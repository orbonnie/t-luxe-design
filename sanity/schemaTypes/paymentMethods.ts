import { defineType, defineField } from "sanity";

export default defineType({
  name: "paymentMethods",
  title: "Payment Methods",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Payments",
    }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "string" }),
    defineField({
      name: "methods",
      title: "Payment Methods",
      type: "array",
      of: [
        {
          type: "object",
          name: "paymentMethod",
          fields: [
            defineField({
              name: "name",
              title: "Platform Name",
              type: "string",
            }),
            defineField({ name: "link", title: "Link", type: "url" }),
            defineField({ name: "handle", title: "Handle", type: "string" }),
            defineField({ name: "note", title: "Note", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
