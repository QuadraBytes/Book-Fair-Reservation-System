"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");   // NEW FIELD
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // === Frontend Validation ===
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // === API Request ===
    try {
      const response = await fetch("http://173.249.12.92:9080/users-service/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          username,
          password
        })
      });

      const text = await response.text();
      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (err) {
        console.error("Invalid JSON from server:", text);
      }

      if (!response.ok) {
        console.error("Signup failed:", data || text);
        alert((data && data.message) || "Signup failed. Try again.");
        return;
      }

      console.log("Signup success:", data);
      alert("Account created successfully!");
      router.replace("/login");

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <Image
          src="/images/sign-in-background.png"
          alt="Books backdrop"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <h1 className="relative z-10 text-center font-serif text-6xl font-light uppercase leading-tight tracking-widest text-white">
          COLOMBO
          <br />
          BOOK FAIR
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 p-8">
        <div className="w-full max-w-md">
          <h2 className="mb-12 text-center font-serif text-4xl font-light text-gray-800">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-base text-gray-800">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none focus:border-orange-700"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none focus:border-orange-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-base text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none focus:border-orange-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-base text-gray-800">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none focus:border-orange-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button variant="orange" className="z-20">
              Sign Up
            </Button>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-orange-700 hover:text-orange-800 hover:underline"
              >
                Login
              </a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
