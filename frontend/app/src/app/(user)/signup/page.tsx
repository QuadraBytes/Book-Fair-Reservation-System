"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);
    const newErrors: Record<string,string> = {};
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) newErrors.email = "Enter a valid email";
    if (username.length < 3) newErrors.username = "Username must be at least 3 characters";
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9081/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password })
      });
      if (!res.ok) {
        const body = await res.json().catch(()=>({}));
        const mapped: Record<string,string> = {};
        // Prefer structured errors array
        if (Array.isArray((body as any).errors)) {
          (body as any).errors.forEach((e: any)=>{ if (e.field && e.message) mapped[e.field] = e.message; });
        }
        // Fallbacks for duplicate or generic conflict cases
        if (res.status === 409) {
          if (!mapped.email && body.message && body.message.toLowerCase().includes("duplicate")) {
            mapped.email = "User already registered with this email";
          }
          if (!mapped.email && body.message && body.message.toLowerCase().includes("user already registered")) {
            mapped.email = body.message;
          }
          // Absolute fallback if server gave no JSON body or message
          if (!mapped.email && !body.message) {
            mapped.email = "User already registered with this email";
          }
        }
        // If still nothing and we have message that mentions email in use
        if (!mapped.email && body.message && body.message.toLowerCase().includes("email")) {
          mapped.email = body.message;
        }
        if (Object.keys(mapped).length) {
          setErrors(mapped);
        } else if (body.message) {
          setGeneralError(body.message);
        } else {
          setGeneralError(`Registration failed (${res.status})`);
        }
        return;
      }
      const data = await res.json();
      console.log("Registered user:", data);
      router.replace("/stall-booking");
    } catch (err: any) {
      setGeneralError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
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

      <div className="flex flex-1 items-center justify-center bg-linear-to-br from-orange-50 to-pink-50 p-8">
        <div className="w-full max-w-md">
          <h2 className="mb-12 text-center font-serif text-4xl font-light text-gray-800">
            Sign Up
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
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-base font-normal text-gray-800"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
              {errors.username && <p className="text-xs text-red-600">{errors.username}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-base font-normal text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-base font-normal text-gray-800"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="rounded-full border border-gray-300 bg-white px-5 py-3.5 text-base outline-none transition-colors duration-300 focus:border-orange-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            {generalError && (
              <p className="text-sm text-red-600 text-center">{generalError}</p>
            )}
            <Button variant="orange" className="z-20" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-orange-700 no-underline transition-colors duration-300 hover:text-orange-800 hover:underline"
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
