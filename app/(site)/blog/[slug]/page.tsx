import { PortableText, type PortableTextBlock } from "@portabletext/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Image as SanityImage } from "sanity";

import { client } from "../../../../sanity/lib/client";
import { urlForImage } from "../../../../sanity/lib/image";
import { postBySlugQuery, postSlugsQuery } from "../../../../sanity/lib/queries";
import { Nav } from "../../Nav";

export const revalidate = 60;

interface PostDetail {
  title: string;
  excerpt?: string;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  noIndex?: boolean;
  authorName?: string;
  categories?: string[];
  tags?: string[];
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    robots: post.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <>
      <Nav />
      <article className="wrap post-detail">
        <div className="meta">
          {[post.authorName, post.categories?.join(", ")].filter(Boolean).join(" · ")}
        </div>
        <h1>{post.title}</h1>
        {post.mainImage && (
          <img src={urlForImage(post.mainImage).width(1200).height(675).url()} alt="" />
        )}
        <div className="body">
          {post.body && <PortableText value={post.body} />}
        </div>
      </article>
    </>
  );
}
