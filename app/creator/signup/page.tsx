"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, AlertCircle, Upload } from "lucide-react";

const categories = [
  { value: "fashion", label: "Fashion" },
  { value: "tech", label: "Tech" },
  { value: "fitness", label: "Fitness" },
  { value: "beauty", label: "Beauty" },
  { value: "photography", label: "Photography" },
  { value: "business", label: "Business" },
  { value: "music", label: "Music" },
];

export default function CreatorSignupPage() {
  const { signup, error, isLoading, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    bio: "",
    category: "fashion",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    handle?: string;
    terms?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear related errors when field changes
    if (name === "password" || name === "confirmPassword") {
      setFormErrors((prev) => ({
        ...prev,
        password: undefined,
        confirmPassword: undefined,
      }));
    } else if (name === "handle") {
      setFormErrors((prev) => ({ ...prev, handle: undefined }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Helper function to create a handle from name
  const generateHandle = () => {
    if (formData.name) {
      const handle = formData.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "");
      setFormData((prev) => ({ ...prev, handle }));
    }
  };

  const validateForm = () => {
    const errors: {
      password?: string;
      confirmPassword?: string;
      handle?: string;
      terms?: string;
    } = {};

    // Password validation
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Handle validation
    if (!formData.handle) {
      errors.handle = "Handle is required";
    } else if (!/^[a-z0-9_]+$/.test(formData.handle)) {
      errors.handle =
        "Handle can only contain lowercase letters, numbers, and underscores";
    }

    // Terms validation
    if (!acceptTerms) {
      errors.terms = "You must accept the terms and conditions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await signup(
        {
          name: formData.name,
          email: formData.email,
          role: "creator",
          creatorProfile: {
            handle: formData.handle,
            bio: formData.bio,
            followers: 0,
            categories: [formData.category],
          },
        },
        formData.password
      );
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Become a Creator</CardTitle>
          <CardDescription>
            Join our platform and start selling your digital products to our
            community
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="handle">Creator Handle</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateHandle}
                  className="text-xs"
                >
                  Generate from name
                </Button>
              </div>
              <div className="flex items-center">
                <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 text-muted-foreground">
                  @
                </span>
                <Input
                  id="handle"
                  name="handle"
                  type="text"
                  placeholder="yourhandle"
                  value={formData.handle}
                  onChange={handleChange}
                  className={`rounded-l-none ${
                    formErrors.handle ? "border-red-500" : ""
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              {formErrors.handle && (
                <p className="text-red-500 text-sm mt-1">{formErrors.handle}</p>
              )}
              <p className="text-muted-foreground text-xs mt-1">
                This will be your unique identifier on the platform
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Primary Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself and what you create..."
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="creator-password">Password</Label>
                <div className="relative">
                  <Input
                    id="creator-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pr-10 ${
                      formErrors.password ? "border-red-500" : ""
                    }`}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="creator-confirm-password">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="creator-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pr-10 ${
                      formErrors.confirmPassword ? "border-red-500" : ""
                    }`}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="creator-terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => {
                  setAcceptTerms(checked as boolean);
                  setFormErrors((prev) => ({ ...prev, terms: undefined }));
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="creator-terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                  ,{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link
                    href="/creator-terms"
                    className="text-primary hover:underline"
                  >
                    Creator Guidelines
                  </Link>
                </label>
                {formErrors.terms && (
                  <p className="text-red-500 text-sm">{formErrors.terms}</p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Creating Creator Account..."
                : "Create Creator Account"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
