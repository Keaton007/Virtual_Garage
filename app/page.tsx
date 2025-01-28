
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const messages: string[] = [
  "Find your dream vehicle",
  "Log-in to save your customizations",
  "Dream Garage",
];

export default function HomePage() {
  const [currentMessage, setCurrentMessage] = useState<string>(messages[0]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev: string) => {
        const currentIndex = messages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    const isLoggedIn: boolean = false; // Replace this with actual auth logic when its made
    if (isLoggedIn) {
      router.push("/vehicles");
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: 'URL("/PHG0721AuthCars02-1.jpg")'}} //find a background image here.
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          {currentMessage}
        </h1>
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-semibold"
        >
          Start Customizing
        </button>
      </div>
    </div>
  );
}
