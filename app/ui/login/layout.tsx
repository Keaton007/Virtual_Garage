import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <div className="bg-gray-100">
        <main>{children}</main>
      </div>
  );
}
