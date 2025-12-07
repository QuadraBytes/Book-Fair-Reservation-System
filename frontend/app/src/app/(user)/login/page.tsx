"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://173.249.12.92:9080/users-service/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usernameOrEmail: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Login failed:", data);
      toast.error(data.message || "Invalid username or password");
      return;
    }

    console.log("Login success:", data);

    // If login success → redirect
    router.replace("/stall-booking");

  } catch (error) {
    console.error("Error during login:", error);
    toast.error("Something went wrong, please try again later.");
  }
};


  return (
    <div className="flex min-h-screen w-full">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <Image
          src="/images/sign-in-background.png"
          alt="Sign in background"
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

      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50  p-8">
        <div className="w-full max-w-md">
          <h2 className="mb-12 text-center font-serif text-4xl font-light text-gray-800">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-base font-normal text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base text-gray-900 outline-none transition-colors duration-300 focus:border-orange-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-base font-normal text-gray-950"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base text-gray-900 outline-none transition-colors duration-300 focus:border-orange-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button variant="orange" className="z-20" onClick={() => {}}>
              Login
            </Button>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-orange-700 no-underline transition-colors duration-300 hover:text-orange-800 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
