import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "CybAcad - Master Cyber Security",
  description: "Interactive learning platform for security professionals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✅ FIX: 'scroll-smooth' enables the gliding effect for anchor links
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-950 text-white antialiased">
        
        {/* ✅ FIX: AuthProvider wraps everything so Navbar can check user state */}
        <AuthProvider>
          
          <Navbar />
          
          {/* Main content wrapper */}
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          
          <Footer />
          
        </AuthProvider>
      </body>
    </html>
  );
}