export const metadata = {
  title: "Studio | EM Growth Group",
  description: "Sanity content studio",
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
