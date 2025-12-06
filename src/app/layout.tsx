import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dealzoshop.com'),
  title: 'DealzoShop – Official Website | India’s Smartest Price Comparison',
  description: 'Welcome to DealzoShop, India’s fastest and smartest price comparison engine. Search across Amazon, Flipkart, Croma, Blinkit and more. Get the best deal every time.',
  openGraph: {
    title: "DealzoShop - Best Price Comparison & Deals",
    description: "Compare prices across top stores instantly.",
    type: "website",
    url: "https://www.dealzoshop.com",
    images: ["/og-image.jpg"],
    siteName: "DealzoShop",
  },
  twitter: {
    card: "summary_large_image",
    title: "DealzoShop - Best Price Comparison",
    description: "Compare prices across top stores instantly.",
  },
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DealzoShop",
              "alternateName": "Dealzo",
              "url": "https://www.dealzoshop.com",
              "logo": "https://www.dealzoshop.com/logo.png",
              "sameAs": [
                "https://instagram.com/dealzoshop",
                "https://facebook.com/dealzoshop",
                "https://twitter.com/dealzoshop"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-[#f1f3f6] text-gray-900`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
