import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import RouteGuard from "@/components/RouteGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fin-Craft Studios - Financial Management",
  description: "Manage your expenses, income, and savings efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RouteGuard>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </RouteGuard>
      </body>
    </html>
  );
}