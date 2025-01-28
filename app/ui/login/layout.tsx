import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
      <nav className="p-4 bg-gray-800 text-white">
          <Link href="/">Home</Link>
        </nav>
        <main>{children}</main> 
        <footer className="p-4 bg-gray-800 text-white text-center">
          © 2025 Virtual Garage
        </footer>
      </body>
    </html>
  );
}
