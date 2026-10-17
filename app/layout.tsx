import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SPARK x AMONG US | Operation Skeld — IIIT Bhopal",
  description:
    "Official Crewmate Registration & Mission Briefing for the IIIT Bhopal Spark Club Among Us Showdown.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        className="bg-[#090B10] text-white antialiased selection:bg-[#F45858] selection:text-white overflow-x-hidden"
      >
        <style>{`
          h1, h2, h3, h4, .font-heading {
            font-family: var(--font-space), sans-serif;
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}

