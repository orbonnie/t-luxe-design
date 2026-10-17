import { defineType, defineField } from "sanity";

export default defineType({
  name: "services",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Services",
    }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "introText", title: "Intro Text", type: "text" }),
    defineField({
      name: "serviceList",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "service",
          fields: [
            defineField({
              name: "name",
              title: "Service Name",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
});
