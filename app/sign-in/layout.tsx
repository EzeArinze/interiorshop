import type { Metadata } from "next";
import "../globals.css";
import Logo from "@/components/NavBarComponents/Logo";

export const metadata: Metadata = {
  title: "Luxe Design",
  description: "Top ten interior designer in nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="md:w-[80%] mx-auto py-8 flex flex-col justify-between">
        <header className="m-4">
          <Logo />
        </header>
        <main>{children}</main>
        <footer>
          <div className="text-center text-sm ">
            <p className="pt-4">&copy; Luxe Design. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
