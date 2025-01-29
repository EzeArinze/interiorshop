import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Shop",
  description: "Top ten interior designer in nigeria",
};

export default function RootLayout({
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
