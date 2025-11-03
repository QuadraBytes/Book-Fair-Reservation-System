"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
    router.replace("/home");
  };
  // const handleLogin = () =>{
  //   router.replace("/stallbooking");
  // }
  return (
    <div className="flex min-h-screen w-full">
      {/* Left with Image fill */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <Image
          src="/sign-in-background.png"   // in /public
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

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-md">
          <h2 className="mb-12 text-center font-serif text-4xl font-light text-gray-800">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base font-normal text-gray-800">
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
              <label htmlFor="password" className="text-base font-normal text-gray-950">
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
            <Button variant="orange" className="z-20" onClick={() =>{}}>
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
