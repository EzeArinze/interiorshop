import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

import NavBar from "@/components/NavBarComponents/NavBar";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";

// import ToggleContext from "@/context/toggleContext";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Interior Shop",
  description: "Top ten and the best interior shop in nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[auto_1fr_auto] items-stretch min-h-dvh`}
      >
        <header className="w-full shadow sticky top-0 bg-background z-20">
          <NavBar />
        </header>

        <main className="py-4">
          <QueryProvider>{children}</QueryProvider>
        </main>

        <footer className="w-full">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
