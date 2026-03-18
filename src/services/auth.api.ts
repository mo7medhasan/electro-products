import { AuthTokens, LoginCredentials, RegisterData, User } from "@/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthTokens> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Invalid email or password");
  }

  return response.json();
};

export const registerUser = async (data: RegisterData): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: "https://picsum.photos/800",
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};

export const getUserProfile = async (accessToken: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

export const checkEmailAvailability = async (
  email: string
): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}/users/is-available`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.isAvailable;
};
