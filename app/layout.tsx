import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const font = Lato({ weight: ['300', '400', '700'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echo - Team chat",
  description: "Team chat and video conference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
