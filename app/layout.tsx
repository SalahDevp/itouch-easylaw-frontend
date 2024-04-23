import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "@styles/globals.css";

const noto = Noto_Sans_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="ar">
      <body className={noto.className}>{children}</body>
    </html>
  );
}
