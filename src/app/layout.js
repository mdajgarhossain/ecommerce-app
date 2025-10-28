import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shopping Hub - Your Online Store",
  description: "Browse and shop amazing products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
              {children}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
