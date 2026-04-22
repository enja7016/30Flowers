import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "30Flowers",
  description: "A birthday-themed interactive flower garden",
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

