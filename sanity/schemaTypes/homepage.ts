import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Homepage",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string" }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "string",
    }),
    defineField({
      name: "aboutHeading",
      title: "About Heading",
      type: "string",
    }),
    defineField({
      name: "aboutText",
      title: "About Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          name: "testimonial",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text" }),
            defineField({
              name: "authorName",
              title: "Author Name",
              type: "string",
            }),
            defineField({
              name: "eventType",
              title: "Event Type",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
});
