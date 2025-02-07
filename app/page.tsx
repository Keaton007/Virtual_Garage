"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageLayout from "@/app/components/PageLayout";

const messages: string[] = [
  "Customize every detail to your vision", 
  "Create the car of your dreams",
  "Join thousands of car enthusiasts",
];

export default function HomePage() {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [opacity, setOpacity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      setOpacity(0);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentMessage((prev) => {
        const currentIndex = messages.indexOf(prev);
        return messages[(currentIndex + 1) % messages.length];
      });
      setOpacity(1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    const isLoggedIn = false; // Replace with actual auth logic
    router.push(isLoggedIn ? "/vehicles" : "/login");
  };

  return (
    <PageLayout className="flex">
      {/* Left side - Car Image */}
      <div className="w-[90%] md:w-[50%] h-[500px] md:h-[600px] mx-auto mt-24 relative rounded-2xl overflow-hidden">
        <iframe
          title="2020 Aston Martin Vantage 59 AMR"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/75ca92f8d548470d83a7daaacb100bc5/embed"
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Right side - Content */}
      <div className="w-1/2 flex flex-col justify-center p-16 bg-gradient-to-br from-[#2B4C5B]/10 to-[#f26522]/5">
        <div className="max-w-xl">
          <Image
            src="/c75ea8f9-32a4-4ba9-a605-805d37d68b07.webp"
            alt="Virtual Garage Logo"
            className="w-72 mb-12 rounded-xl"
            width={288}
            height={72}
          />
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
            style={{ transition: "opacity 500ms ease-in-out", opacity }}
          >
            {currentMessage}
          </h2>
          <p className="text-white/80 text-lg mb-12">
            Experience the future of automotive customization with our cutting-edge platform.
          </p>
          <button
            onClick={handleButtonClick}
            className="px-10 py-4 text-white bg-[#f26522]/90 hover:bg-[#f26522] rounded-full text-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#f26522]/20 transform hover:-translate-y-0.5"
            aria-label="Start customizing your car"
          >
            Start Customizing
          </button>
        </div>
      </div>
    </PageLayout>
  );
}