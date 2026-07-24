import type { SchemaTypeDefinition } from "sanity";

import { author } from "./author";
import { blockContent } from "./blockContent";
import { category } from "./category";
import { post } from "./post";
import { series } from "./series";
import { tag } from "./tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, tag, series, blockContent],
};
