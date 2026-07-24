import type { Metadata } from "next";
import type { Image as SanityImage } from "sanity";

import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";
import { postListQuery } from "../../../sanity/lib/queries";
import { Nav } from "../Nav";

export const metadata: Metadata = {
  title: "Blog | EM Growth Group",
  description:
    "Insights on revenue growth, digital marketing, AI automation, and revenue operations.",
};

export const revalidate = 60;

interface PostListItem {
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
  authorName?: string;
  categories?: string[];
}

export default async function BlogIndexPage() {
  const posts = await client.fetch<PostListItem[]>(postListQuery);

  return (
    <>
      <Nav />
      <div className="wrap blog-hero">
        <span className="eyebrow">Insights</span>
        <h1>The Revenue Growth Blog</h1>
      </div>
      <div className="wrap">
        {posts.length === 0 ? (
          <p className="post-empty">
            No posts published yet. Add one in the{" "}
            <a href="/studio">Sanity Studio</a>.
          </p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <a key={post.slug} className="post-card" href={`/blog/${post.slug}`}>
                {post.mainImage && (
                  <img
                    src={urlForImage(post.mainImage).width(600).height(338).url()}
                    alt=""
                  />
                )}
                <div className="body">
                  <div className="meta">
                    {[post.authorName, post.categories?.[0]]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                  <h2>{post.title}</h2>
                  {post.excerpt && <p>{post.excerpt}</p>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
