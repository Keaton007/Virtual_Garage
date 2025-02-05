"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            if (!formData.username && !formData.email && !formData.password) {
                setError("Please fill out all fields");
                return;
            };

            if (formData.password !== formData.confirmPassword) {
                setError("Please make sure the passwords are the same");
                return;
            };

            // replace with register api call, need to return a token for login
            // will redirect to /vehicles with the token
            const response = await fetch("/app/lib/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password }),
            });

            if (response.ok) {
                //attach token here, send to vehicles. user will be logged in.
                router.push("/ui/vehicles");
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occured. Please try again.");
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
                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-white/60">Join the Virtual Garage community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#f26522]/50 transition-colors backdrop-blur-sm"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <input
                        className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#f26522]/50 transition-colors backdrop-blur-sm"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <input
                        className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#f26522]/50 transition-colors backdrop-blur-sm"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <input
                        className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#f26522]/50 transition-colors backdrop-blur-sm"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-400 text-sm">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full px-8 py-3 bg-[#f26522]/90 hover:bg-[#f26522] text-white rounded-full transition-all font-medium hover:shadow-lg hover:shadow-[#f26522]/20"
                >
                    Create Account
                </button>
            </form>

            <div className="mt-8 text-center">
                <span className="text-white/60">
                    Already have an account?{" "}
                </span>
                <Link
                    href="/login"
                    className="text-[#f26522] hover:text-white transition-colors font-medium"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}