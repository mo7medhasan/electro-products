"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const authLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ email, password });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto mt-20">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
          <LogIn className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm">
          Sign in to your account to continue
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          variant="filled"
          size="lg"
          rounded="lg"
          disabled={isSubmitting}
          autoComplete="email"
          id="login-email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          variant="filled"
          size="lg"
          rounded="lg"
          disabled={isSubmitting}
          autoComplete="current-password"
          id="login-password"
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isSubmitting || authLoading}
          className="mt-2 rounded-xl! text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
        >
          Sign In
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary hover:text-primary-light font-medium transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>

      {/* Demo credentials hint */}
      <div className="mt-6 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
        <p className="text-xs text-gray-500 text-center mb-1">
          Demo credentials
        </p>
        <p className="text-xs text-gray-400 text-center font-mono">
          john@mail.com / changeme
        </p>
      </div>
    </div>
  );
}
