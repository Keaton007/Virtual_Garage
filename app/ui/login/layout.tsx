import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <div className="bg-gray-100">
        <nav className="absolute top-0 left-0 w-full p-4 flex justify-between bg-black bg-opacity-50 z-50">
          <Link href="/">Home</Link>
        </nav>
        <main>{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          © 2025 Virtual Garage
        </footer>
      </div>
  );
}
