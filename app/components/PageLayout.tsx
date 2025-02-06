"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAuthToken, removeAuthToken } from "@/app/utils/auth";
import { useRouter } from "next/navigation";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/minimalist-garage-example.jpg")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#2B4C5B]/95 to-black/80" />

      <div className="relative flex flex-col min-h-screen">
        <nav className="w-full p-6 flex justify-between items-center bg-white/5 backdrop-blur-md shadow-lg z-10 border-b border-white/10">
          <div className="flex items-center space-x-8">
            <Image
              className="w-auto h-14 rounded-lg brightness-110"
              src="/c75ea8f9-32a4-4ba9-a605-805d37d68b07.webp"
              alt="Virtual Garage Logo"
              width={100}
              height={48}
            />
            <div className="flex space-x-8">
              <Link href="/" className="text-white/90 hover:text-[#f26522] font-medium transition-colors">
                Home
              </Link>
              <Link href="/dealers" className="text-white/90 hover:text-[#f26522] font-medium transition-colors">
                Dealers
              </Link>
              {isAuthenticated && (
                <Link href="/vehicles" className="text-white/90 hover:text-[#f26522] font-medium transition-colors">
                  My Vehicles
                </Link>
              )}
              <Link href="/about" className="text-white/90 hover:text-[#f26522] font-medium transition-colors">
                About Us
              </Link>
            </div>
          </div>
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="px-8 py-3 text-white bg-[#f26522]/90 hover:bg-[#f26522] rounded-full transition-all font-medium backdrop-blur-sm hover:shadow-lg hover:shadow-[#f26522]/20"
            >
              Log Out
            </button>
          ) : (
            <Link 
              href="/login" 
              className="px-8 py-3 text-white bg-[#f26522]/90 hover:bg-[#f26522] rounded-full transition-all font-medium backdrop-blur-sm hover:shadow-lg hover:shadow-[#f26522]/20"
            >
              Log In
            </Link>
          )}
        </nav>

        <main className={`flex-1 ${className}`}>
          {children}
        </main>
      </div>
    </div>
  );
} 