// app/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="absolute top-0 left-0 w-full p-4 flex justify-between bg-black bg-opacity-50 z-10">
          <Link href="/" className="text-white text-lg font-semibold">
            Home
          </Link>
          <Link href="/login" className="text-white text-lg font-semibold">
            Log In
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
