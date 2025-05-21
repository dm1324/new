"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  BarChart3,
  ShoppingBag,
  Settings,
  Upload,
  Users,
  HelpCircle,
  LogIn,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CreatorWelcomePage() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Analytics Dashboard",
      description:
        "Gain insights into your sales performance, audience demographics, and engagement metrics.",
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "Product Management",
      description:
        "Easily create, update, and organize your products with our intuitive management tools.",
    },
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Bulk Upload",
      description:
        "Save time by uploading multiple products at once with our CSV import feature.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Insights",
      description:
        "Connect with your audience and understand what drives their purchasing decisions.",
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Customizable Store",
      description:
        "Personalize your storefront to match your brand identity and enhance user experience.",
    },
    {
      icon: <HelpCircle className="h-8 w-8 text-primary" />,
      title: "Dedicated Support",
      description:
        "Get help whenever you need it with our responsive creator support team.",
    },
  ];

  const quickLinks = [
    { title: "Add New Product", link: "/creator/dashboard/products/new" },
    { title: "View Your Sales", link: "/creator/dashboard/analytics" },
    { title: "Update Profile", link: "/creator/dashboard/settings" },
    { title: "Manage Orders", link: "/creator/dashboard/orders" },
    { title: "Promotion Tools", link: "/creator/dashboard/marketing" },
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description:
        "A comprehensive walkthrough of our platform's key features.",
      link: "/creator/resources/getting-started",
    },
    {
      title: "Product Photography Tips",
      description: "Learn how to showcase your products in the best light.",
      link: "/creator/resources/photography",
    },
    {
      title: "Marketing Strategies",
      description:
        "Effective ways to promote your products and grow your audience.",
      link: "/creator/resources/marketing",
    },
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to create a new password.",
    },
    {
      question: "How do I receive my payments?",
      answer:
        "Payments are processed every two weeks and transferred directly to your linked bank account. You can view your payment history in the Finance section of your dashboard.",
    },
    {
      question: "Can I offer discounts on my products?",
      answer:
        "Yes! You can create custom discount codes in the Marketing section of your dashboard. Set percentage or fixed amount discounts and control their validity period.",
    },
    {
      question: "How do I contact creator support?",
      answer:
        "You can reach our dedicated creator support team through the Help Center in your dashboard, or by emailing creator-support@creatormarket.com.",
    },
  ];

  return (
    <>
      {/* Custom Header for Creator Welcome Page */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center">
                {/* <Image
                  src="/logo.svg"
                  alt="CreatorMarket Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                /> */}
                <span className="font-bold text-xl">CreatorMarket</span>
              </div>
            </Link>
            <div className="hidden md:block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Creator Portal
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://creatormarket.com/help"
              className="text-muted-foreground hover:text-foreground text-sm hidden md:block"
            >
              Help Center
            </Link>
            <Link href="/creatorlogin">
              <Button variant="default" size="sm" className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Creator Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-muted/30">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome Back, Creator
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your creative journey continues here. Sign in to manage your
              products, track your performance, and grow your business.
            </p>
            <Link href="/creatorlogin">
              <Button size="lg" className="text-lg px-8">
                Sign In to Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Your Creator Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-muted/30 rounded-lg p-6 transition-all hover:shadow-md"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-background rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickLinks.map((link, index) => (
                    <Link key={index} href={link.link}>
                      <div className="flex items-center justify-between p-4 rounded-md border hover:bg-primary/5 transition-colors">
                        <span className="font-medium">{link.title}</span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorial */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">See What's New</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Check out our latest platform updates and learn how to make the
              most of your creator tools.
            </p>
            <div className="max-w-4xl mx-auto relative bg-black aspect-video rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {!videoPlaying ? (
                  <Button
                    size="lg"
                    className="rounded-full w-16 h-16 flex items-center justify-center"
                    onClick={() => setVideoPlaying(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </Button>
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-white">Video Player Placeholder</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Creator Resources */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Creator Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {resources.map((resource, index) => (
                <Link key={index} href={resource.link}>
                  <div className="bg-background rounded-lg p-6 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {resource.description}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      <span>Learn more</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
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
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Still have questions? We're here to help.
              </p>
              <Link href="https://creatormarket.com/help">
                <Button variant="outline" size="lg">
                  Visit Help Center
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to continue your journey?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Sign in to your creator dashboard to manage your store, upload new
              products, and track your performance.
            </p>
            <Link href="/creator/dashboard">
              <Button
                variant="secondary"
                size="lg"
                className="text-primary font-semibold px-8"
              >
                Sign In Now
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src="/logo.svg"
                alt="CreatorMarket Logo"
                width={32}
                height={32}
                className="mb-4 mx-auto md:mx-0"
              />
              <p className="text-muted-foreground text-sm text-center md:text-left">
                © {new Date().getFullYear()} CreatorMarket. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-8">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="/creator/help"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
