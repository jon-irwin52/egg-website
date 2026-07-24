import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog | EM Growth Group",
  description:
    "Insights on revenue growth, digital marketing, AI automation, and revenue operations from EM Growth Group.",
  icons: {
    icon: [{ url: "/favicon.png" }],
    shortcut: [{ url: "/favicon.png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;800;900&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
