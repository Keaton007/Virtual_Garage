import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";


export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
