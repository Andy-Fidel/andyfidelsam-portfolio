import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: {
    default: "Andy-Fidel Samuel — Full-stack Product Engineer",
    template: "%s — Andy-Fidel Samuel",
  },
  description:
    "Full-stack product engineer building dependable, human-centred software for teams and institutions.",
  keywords: ["Andy-Fidel Samuel", "Full-stack engineer", "Product engineer", "Ghana", "React", "TypeScript"],
  authors: [{ name: "Andy-Fidel Samuel", url: "https://github.com/Andy-Fidel" }],
  openGraph: {
    type: "website",
    title: "Andy-Fidel Samuel — Full-stack Product Engineer",
    description: "I build digital products that make complex work feel simple.",
    siteName: "Andy-Fidel Samuel",
    images: [{ url: "/og.png", width: 1744, height: 909, alt: "Andy-Fidel Samuel — Full-stack Product Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy-Fidel Samuel — Full-stack Product Engineer",
    description: "I build digital products that make complex work feel simple.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
