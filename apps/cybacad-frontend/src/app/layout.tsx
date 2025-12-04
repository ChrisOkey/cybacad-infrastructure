import { Inter } from "next/font/google"; // ✅ Better looking standard font
import "./globals.css";
// ✅ Initialize Firebase/Emulators globally (Uncomment if you created the file)
import "@/lib/firebase"; 

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cybacad Dashboard",
  description: "Learning platform dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}