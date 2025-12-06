import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dealzoshop.com'),
  title: 'Dealzo – Best Price Comparison in India',
  description: 'Compare prices from Amazon, Flipkart, Myntra, Ajio & 20+ stores instantly',
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
