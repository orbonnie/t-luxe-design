import type { StructureResolver } from "sanity/structure";

const singletonTypes = [
  "homepage",
  "gallery",
  "services",
  "paymentMethods",
  "contact",
];

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("Gallery")
        .id("gallery")
        .child(S.document().schemaType("gallery").documentId("gallery")),
      S.listItem()
        .title("Services")
        .id("services")
        .child(S.document().schemaType("services").documentId("services")),
      S.listItem()
        .title("Payment Methods")
        .id("paymentMethods")
        .child(
          S.document()
            .schemaType("paymentMethods")
            .documentId("paymentMethods"),
        ),
      S.listItem()
        .title("Contact")
        .id("contact")
        .child(S.document().schemaType("contact").documentId("contact")),
      // any future non-singleton types would go here via:
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.includes(listItem.getId() as string),
      ),
    ]);
