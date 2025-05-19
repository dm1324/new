"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "user" | "creator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  creatorProfile?: {
    handle: string;
    bio: string;
    followers: number;
    categories: string[];
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Test credentials
export const TEST_CREDENTIALS = {
  user: {
    email: "user@test.com",
    password: "test123456",
  },
  creator: {
    email: "creator@test.com",
    password: "test123456",
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  clearError: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate test credentials
      const isValidUser = 
        (role === "user" && 
          email === TEST_CREDENTIALS.user.email && 
          password === TEST_CREDENTIALS.user.password) ||
        (role === "creator" && 
          email === TEST_CREDENTIALS.creator.email && 
          password === TEST_CREDENTIALS.creator.password);

      if (!isValidUser) {
        throw new Error("Invalid credentials");
      }

      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        ...(role === "creator" && {
          creatorProfile: {
            handle: email.split("@")[0].toLowerCase(),
            bio: "Creator bio goes here",
            followers: Math.floor(Math.random() * 1000),
            categories: ["Fashion"],
          },
        }),
      };

      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("auth-token", "mock-token");

      setAuthState({
        user: mockUser,
        isLoading: false,
        error: null,
      });

      // Redirect to home page instead of dashboard
      router.push("/");
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }));
    }
  };

  const signup = async (userData: Partial<User>, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!userData.email || !userData.name || !userData.role) {
        throw new Error("Missing required fields");
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
        ...(userData.role === "creator" && {
          creatorProfile: userData.creatorProfile || {
            handle: userData.email.split("@")[0].toLowerCase(),
            bio: "New creator",
            followers: 0,
            categories: ["Fashion"],
          },
        }),
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("auth-token", "mock-token");

      setAuthState({
        user: newUser,
        isLoading: false,
        error: null,
      });

      // Redirect to home page instead of dashboard
      router.push("/");
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Signup failed",
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth-token");
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
    router.push("/");
  };

  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}