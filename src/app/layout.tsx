import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#f1f3f6] text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
