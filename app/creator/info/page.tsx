"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ArrowRight, Eye, EyeOff, Upload } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const categories = [
  { value: "fashion", label: "Fashion" },
  { value: "tech", label: "Tech" },
  { value: "fitness", label: "Fitness" },
  { value: "beauty", label: "Beauty" },
  { value: "photography", label: "Photography" },
  { value: "business", label: "Business" },
  { value: "music", label: "Music" },
];

export default function CreatorWelcomePage() {
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
  const [step, setStep] = useState(1);

  const benefits = [
    {
      title: "Global Reach",
      description:
        "Connect with millions of potential customers worldwide through our platform.",
    },
    {
      title: "Easy Store Management",
      description:
        "Powerful tools to manage your products, orders, and customer relationships.",
    },
    {
      title: "Marketing Support",
      description:
        "Get featured in our promotional campaigns and benefit from our marketing expertise.",
    },
    {
      title: "Secure Payments",
      description:
        "Reliable payment processing with instant transfers to your account.",
    },
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      story:
        "Started with just 5 products and now runs a 6-figure business on CreatorMarket.",
      category: "Fashion",
    },
    {
      name: "Mike Johnson",
      image:
        "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg",
      story:
        "Turned his passion for tech reviews into a thriving online store.",
      category: "Tech",
    },
    {
      name: "Emma Davis",
      image:
        "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg",
      story:
        "Built a community of fitness enthusiasts while scaling her product line.",
      category: "Fitness",
    },
  ];

  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "Fill out our application form with your details and portfolio. Our team will review and get back to you within 48 hours.",
    },
    {
      question: "What are the fees?",
      answer:
        "We charge a competitive 10% commission on sales. There are no monthly fees or hidden charges.",
    },
    {
      question: "What can I sell?",
      answer:
        "You can sell physical products, digital downloads, and merchandise related to your content and brand.",
    },
    {
      question: "How do payments work?",
      answer:
        "We process payments securely and transfer your earnings to your account every two weeks.",
    },
    {
      question: "Can I integrate with my existing store?",
      answer:
        "Yes, we offer tools to sync inventory and orders with your existing e-commerce platforms.",
    },
  ];

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
      setStep(2);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-muted/30">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome Creators!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our platform to create your own shop, connect with your
              audience, and start selling your products with zero hassle.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Join CreatorMarket?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signup Form Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Become a Creator
              </h2>

              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
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
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.handle}
                      </p>
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
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
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
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
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
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
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
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => {
                        setAcceptTerms(checked as boolean);
                        setFormErrors((prev) => ({
                          ...prev,
                          terms: undefined,
                        }));
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
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
                        <p className="text-red-500 text-sm">
                          {formErrors.terms}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Join as Creator"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    Application Submitted!
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you for your interest in joining CreatorMarket. We'll
                    review your application and get back to you within 48 hours.
                  </p>
                  <Button onClick={() => setStep(1)}>Back to Form</Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div
                  key={index}
                  className="bg-muted/30 rounded-lg p-6 text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">{story.name}</h3>
                  <p className="text-sm text-primary mb-4">{story.category}</p>
                  <p className="text-muted-foreground">{story.story}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
