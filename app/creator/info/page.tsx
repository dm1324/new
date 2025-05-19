"use client";

import { useState } from "react";
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
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function CreatorSignupPage() {
  const [step, setStep] = useState(1);

  const benefits = [
    {
      title: "Global Reach",
      description: "Connect with millions of potential customers worldwide through our platform.",
    },
    {
      title: "Easy Store Management",
      description: "Powerful tools to manage your products, orders, and customer relationships.",
    },
    {
      title: "Marketing Support",
      description: "Get featured in our promotional campaigns and benefit from our marketing expertise.",
    },
    {
      title: "Secure Payments",
      description: "Reliable payment processing with instant transfers to your account.",
    },
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      story: "Started with just 5 products and now runs a 6-figure business on CreatorMarket.",
      category: "Fashion",
    },
    {
      name: "Mike Johnson",
      image: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg",
      story: "Turned his passion for tech reviews into a thriving online store.",
      category: "Tech",
    },
    {
      name: "Emma Davis",
      image: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg",
      story: "Built a community of fitness enthusiasts while scaling her product line.",
      category: "Fitness",
    },
  ];

  const faqs = [
    {
      question: "How do I get started?",
      answer: "Fill out our application form with your details and portfolio. Our team will review and get back to you within 48 hours.",
    },
    {
      question: "What are the fees?",
      answer: "We charge a competitive 10% commission on sales. There are no monthly fees or hidden charges.",
    },
    {
      question: "What can I sell?",
      answer: "You can sell physical products, digital downloads, and merchandise related to your content and brand.",
    },
    {
      question: "How do payments work?",
      answer: "We process payments securely and transfer your earnings to your account every two weeks.",
    },
    {
      question: "Can I integrate with my existing store?",
      answer: "Yes, we offer tools to sync inventory and orders with your existing e-commerce platforms.",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Become a Creator</h1>
            <p className="text-lg text-muted-foreground">
              Join our community of successful creators and start selling your products today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-lg shadow-lg p-8 mb-24">
            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Creator Application</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website/Portfolio</Label>
                    <Input id="website" type="url" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="social">Social Media Links</Label>
                    <Input id="social" placeholder="Instagram, YouTube, TikTok, etc." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="about">Tell us about yourself</Label>
                    <Textarea
                      id="about"
                      placeholder="Share your story, experience, and what you want to sell"
                      className="h-32"
                    />
                  </div>
                </div>
                
                <Button size="lg" className="w-full" onClick={() => setStep(2)}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
                <p className="text-muted-foreground mb-8">
                  Thank you for your interest in joining CreatorMarket. We'll review your application
                  and get back to you within 48 hours.
                </p>
                <Button size="lg" onClick={() => setStep(1)}>
                  Submit Another Application
                </Button>
              </div>
            )}
          </div>

          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-8 text-center">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-background rounded-lg p-6 text-center">
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

          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}