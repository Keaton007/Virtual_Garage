"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {

            if (!username && !email && !password) {
                setError("Please fill out all fields");
                return;
            };

            if (password !== confirmPassword) {
                setError("Please make sure the passwords are the same");
                return;
            };

            // replace with register api call, need to return a token for login
            // will redirect to /vehicles with the token
            const response = await fetch("/app/lib/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
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
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="px-6 py-4">
                <div className="flex justify-center mx-auto">
                    <img
                        className="w-auto h-20 sm:h-16"
                        src="/c75ea8f9-32a4-4ba9-a605-805d37d68b07.webp"
                        alt="logo"
                    />
                </div>

                <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                    Welcome
                </h3>
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                    Register for an account
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:bordey-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="Username"
                            placeholder="Username"
                            aria-label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:bordey-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="Email"
                            placeholder="Email"
                            aria-label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:bordey-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="Password"
                            placeholder="Password"
                            aria-label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-300 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:bordey-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="Password"
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="mt-2 text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <div className="flex items-center justify-center mt-4">
                        <button
                            type="submit"
                            className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-200">
                    Already have an account?{" "}
                </span>
                <a
                    href="/login"
                    className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                >
                    Log in
                </a>
            </div>
        </div>
    );
}