"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Replace this with actual API call for login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/vehicles"); // Redirect after successful login
      } else {
        const data = await response.json();
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Image
          src="/c75ea8f9-32a4-4ba9-a605-805d37d68b07.webp"
          alt="Virtual Garage Logo"
          width={180}
          height={48}
          className="mx-auto mb-4 rounded-xl"
        />
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-white/60">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#f26522]/50 transition-colors backdrop-blur-sm"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#f26522]/50 transition-colors backdrop-blur-sm"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="text-sm text-white/60 hover:text-[#f26522] transition-colors"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            className="px-8 py-3 bg-[#f26522]/90 hover:bg-[#f26522] text-white rounded-full transition-all font-medium hover:shadow-lg hover:shadow-[#f26522]/20"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <span className="text-white/60">
          Don't have an account?{" "}
        </span>
        <Link
          href="/register"
          className="text-[#f26522] hover:text-white transition-colors font-medium"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
