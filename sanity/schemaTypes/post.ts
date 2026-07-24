import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description: "Describe the image for screen readers and search engines.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "attachment",
      title: "PDF attachment",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short summary used on blog listing and social previews.",
      rows: 4,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "series" }],
    }),
    defineField({
      name: "previousArticle",
      title: "Previous article",
      type: "reference",
      to: [{ type: "post" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "metaTitle",
      title: "Meta title",
      description:
        "Title used for search engines and social previews. Falls back to the post title if left blank.",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("Longer titles may be truncated in search results."),
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description: "Summary shown in search results. Aim for 150-160 characters.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning("Longer descriptions may be truncated in search results."),
      group: "seo",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      description: "Enable to add a noindex tag, keeping this post out of search results.",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
