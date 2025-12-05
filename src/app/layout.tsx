import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dealzo - Best Price Comparison & Deals",
  description: "Find the lowest prices on Amazon, Flipkart, Walmart, and more. Compare prices instantly and save money with Dealzo.",
  openGraph: {
    title: "Dealzo - Best Price Comparison & Deals",
    description: "Compare prices across top stores instantly.",
    type: "website",
    url: "https://dealzo.vercel.app",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dealzo - Best Price Comparison",
    description: "Compare prices across top stores instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
