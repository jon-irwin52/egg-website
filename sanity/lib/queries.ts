import { groq } from "next-sanity";

export const postListQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "authorName": author->name,
    "categories": categories[]->title
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    mainImage,
    body,
    publishedAt,
    metaTitle,
    metaDescription,
    noIndex,
    "authorName": author->name,
    "categories": categories[]->title,
    "tags": tags[]->title
  }
`;
