import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SanityLive } from "../sanity/lib/live";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "T Luxe Balloon & Event Decor",
  description: "Balloon and event decorating, elevated.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
