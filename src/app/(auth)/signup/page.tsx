"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { checkEmailAvailability } from "@/services/auth.api";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const register = useAuthStore((state) => state.register);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 4)
      errors.password = "Password must be at least 4 characters";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Check email availability first
      const isAvailable = await checkEmailAvailability(email);
      if (!isAvailable) {
        setFieldErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
        setIsSubmitting(false);
        return;
      }

      await register({ name, email, password, avatar: "https://picsum.photos/800" });
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl w-full max-w-md mx-auto mt-20">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
          <UserPlus className="w-7 h-7 text-cyan-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400 text-sm">
          Join us and start shopping today
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          placeholder="Ahmed"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User className="w-4 h-4" />}
          variant="filled"
          size="lg"
          rounded="lg"
          error={fieldErrors.name}
          disabled={isSubmitting}
          id="signup-name"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Ahmed@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          variant="filled"
          size="lg"
          rounded="lg"
          error={fieldErrors.email}
          disabled={isSubmitting}
          id="signup-email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          variant="filled"
          size="lg"
          rounded="lg"
          error={fieldErrors.password}
          disabled={isSubmitting}
          id="signup-password"
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isSubmitting}
          className="mt-2 rounded-xl! text-base font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
          style={{ backgroundColor: "#06b6d4" }}
        >
          Create Account
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary hover:text-primary-light font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
