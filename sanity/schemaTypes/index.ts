import { type SchemaTypeDefinition } from "sanity";

import homepage from "./homepage";
import gallery from "./gallery";
import services from "./services";
import paymentMethods from "./paymentMethods";
import contact from "./contact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, gallery, services, paymentMethods, contact],
};
