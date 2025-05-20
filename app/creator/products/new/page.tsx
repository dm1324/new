"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
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

import { Switch } from "@/components/ui/switch";
import { categories } from "@/lib/data";
import { X, Upload, AlertCircle, Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Specification {
  key: string;
  value: string;
}

interface FormData {
  name: string;
  description: string;
  price: number;
  discount: number | null;
  stockQuantity: number;
  category: string;
  tags: string;
  rating: number;
  reviewCount: number;
  trending: boolean;
  specifications: Specification[];
}

export default function NewProductPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specifications, setSpecifications] = useState<Specification[]>([
    { key: "", value: "" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: null,
      stockQuantity: 0,
      category: "",
      tags: "",
      rating: 0,
      reviewCount: 0,
      trending: false,
      specifications: [],
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      "video/*": [".mp4", ".webm"],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles].slice(0, 5));
    },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newSpecifications = [...specifications];
    newSpecifications[index][field] = value;
    setSpecifications(newSpecifications);
  };

  if (!user || user.role !== "creator") {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">
            Please log in as a creator to add products.
          </p>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (files.length === 0) {
        setError("Please upload at least one image");
        return;
      }

      // Filter out empty specifications
      const filteredSpecifications = specifications
        .filter((spec) => spec.key.trim() !== "" && spec.value.trim() !== "")
        .reduce((acc, spec) => {
          acc[spec.key] = spec.value;
          return acc;
        }, {} as Record<string, string>);

      // Create FormData for file upload
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      // Add product data
      formData.append(
        "data",
        JSON.stringify({
          name: data.name,
          description: data.description,
          price: data.price,
          discount: data.discount || null,
          category: data.category,
          rating: data.rating,
          reviewCount: data.reviewCount,
          trending: data.trending,
          specifications: filteredSpecifications,
          tags: data.tags.split(",").map((tag) => tag.trim()),
          creator: {
            name: user.name,
            handle: user.handle,
            image: user.profileImage,
          },
          creatorId: user.id,
        })
      );

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      router.push("/creator/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Create a new product listing for your store
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0",
                      },
                    })}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    {...register("discount", {
                      min: { value: 0, message: "Discount cannot be negative" },
                      max: {
                        value: 100,
                        message: "Discount cannot exceed 100%",
                      },
                    })}
                  />
                  {errors.discount && (
                    <p className="text-sm text-destructive">
                      {errors.discount.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    {...register("rating", {
                      min: {
                        value: 0,
                        message: "Rating must be between 0 and 5",
                      },
                      max: {
                        value: 5,
                        message: "Rating must be between 0 and 5",
                      },
                    })}
                  />
                  {errors.rating && (
                    <p className="text-sm text-destructive">
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewCount">Review Count</Label>
                  <Input
                    id="reviewCount"
                    type="number"
                    {...register("reviewCount", {
                      min: {
                        value: 0,
                        message: "Review count cannot be negative",
                      },
                    })}
                  />
                  {errors.reviewCount && (
                    <p className="text-sm text-destructive">
                      {errors.reviewCount.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Label htmlFor="trending">Mark as Trending</Label>
                <Switch id="trending" {...register("trending")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  {...register("stockQuantity", {
                    required: "Stock quantity is required",
                    min: { value: 0, message: "Stock cannot be negative" },
                  })}
                />
                {errors.stockQuantity && (
                  <p className="text-sm text-destructive">
                    {errors.stockQuantity.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  {...register("tags")}
                  placeholder="Enter tags separated by commas"
                />
                <p className="text-sm text-muted-foreground">
                  Example: vintage, handmade, limited edition
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Product Specifications</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSpecification}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Specification
                  </Button>
                </div>

                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Input
                      placeholder="Key (e.g. Material)"
                      value={spec.key}
                      onChange={(e) =>
                        updateSpecification(index, "key", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value (e.g. Cotton)"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSpecification(index)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label>Images & Videos</Label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Drag & drop files here, or click to select files
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supports images and videos (max 5 files)
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Product..." : "Create Product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
