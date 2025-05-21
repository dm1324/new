"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { useAuth } from "@/lib/auth-context";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AuthModal from "@/components/auth/auth-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, DollarSign, Check } from "lucide-react";
import CartItem from "@/components/cart/cart-item";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [orderComplete, setOrderComplete] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
    }
  }, [user]);

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...product!,
      quantity: item.quantity,
    };
  });

  // Form values state
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    saveInfo: false,
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [id]: type === "checkbox" ? checked : value,
    });

    // Clear error when user types
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "postalCode",
      "country",
    ];

    // Check required fields
    requiredFields.forEach((field) => {
      if (!formValues[field as keyof typeof formValues]) {
        errors[field] = "This field is required";
      }
    });

    // Email validation
    if (
      formValues.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
    ) {
      errors.email = "Please enter a valid email address";
    }

    // Card validation if credit card payment is selected
    if (paymentMethod === "credit-card") {
      if (!formValues.cardName) errors.cardName = "Cardholder name is required";
      if (!formValues.cardNumber) errors.cardNumber = "Card number is required";
      if (!formValues.cardExpiry) errors.cardExpiry = "Expiry date is required";
      if (!formValues.cardCvc) errors.cardCvc = "CVC is required";

      // Basic card number format check
      if (
        formValues.cardNumber &&
        !/^\d{16}$/.test(formValues.cardNumber.replace(/\s/g, ""))
      ) {
        errors.cardNumber = "Please enter a valid 16-digit card number";
      }

      // Basic expiry date format check (MM/YY)
      if (
        formValues.cardExpiry &&
        !/^\d{2}\/\d{2}$/.test(formValues.cardExpiry)
      ) {
        errors.cardExpiry = "Please use MM/YY format";
      }

      // Basic CVC check
      if (formValues.cardCvc && !/^\d{3,4}$/.test(formValues.cardCvc)) {
        errors.cardCvc = "Please enter a valid CVC";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Validate form before submission
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Complete order
    clearCart();
    setIsProcessing(false);
    setOrderComplete(true);
  };

  // Redirect to home after successful order
  const handleContinueShopping = () => {
    router.push("/products");
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. We've sent a confirmation email to{" "}
            {formValues.email}.
          </p>
          <p className="text-muted-foreground mb-8">
            Your order number is{" "}
            <span className="font-medium">
              {Math.floor(100000 + Math.random() * 900000)}
            </span>
          </p>
          <Button onClick={handleContinueShopping} size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart to proceed with checkout.
          </p>
          <Button asChild>
            <a href="/products">Browse Products</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formValues.firstName}
                        onChange={handleInputChange}
                      />
                      {formErrors.firstName && (
                        <p className="text-sm text-destructive">
                          {formErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formValues.lastName}
                        onChange={handleInputChange}
                      />
                      {formErrors.lastName && (
                        <p className="text-sm text-destructive">
                          {formErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-destructive">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formValues.address}
                      onChange={handleInputChange}
                    />
                    {formErrors.address && (
                      <p className="text-sm text-destructive">
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formValues.city}
                        onChange={handleInputChange}
                      />
                      {formErrors.city && (
                        <p className="text-sm text-destructive">
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formValues.postalCode}
                        onChange={handleInputChange}
                      />
                      {formErrors.postalCode && (
                        <p className="text-sm text-destructive">
                          {formErrors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formValues.country}
                      onChange={handleInputChange}
                    />
                    {formErrors.country && (
                      <p className="text-sm text-destructive">
                        {formErrors.country}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="saveInfo"
                      checked={formValues.saveInfo}
                      onCheckedChange={(checked) =>
                        setFormValues({
                          ...formValues,
                          saveInfo: checked === true,
                        })
                      }
                    />
                    <label
                      htmlFor="saveInfo"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this information for next time
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue="credit-card"
                    className="space-y-4"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label
                        htmlFor="credit-card"
                        className="flex items-center"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "credit-card" && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="Name as it appears on card"
                          value={formValues.cardName}
                          onChange={handleInputChange}
                        />
                        {formErrors.cardName && (
                          <p className="text-sm text-destructive">
                            {formErrors.cardName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formValues.cardNumber}
                          onChange={handleInputChange}
                        />
                        {formErrors.cardNumber && (
                          <p className="text-sm text-destructive">
                            {formErrors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/YY"
                            value={formValues.cardExpiry}
                            onChange={handleInputChange}
                          />
                          {formErrors.cardExpiry && (
                            <p className="text-sm text-destructive">
                              {formErrors.cardExpiry}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">CVC</Label>
                          <Input
                            id="cardCvc"
                            placeholder="123"
                            value={formValues.cardCvc}
                            onChange={handleInputChange}
                          />
                          {formErrors.cardCvc && (
                            <p className="text-sm text-destructive">
                              {formErrors.cardCvc}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="mt-6 p-4 bg-muted rounded-md">
                      <p className="text-sm">
                        You'll be redirected to PayPal to complete your purchase
                        securely.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {cartProducts.length}{" "}
                  {cartProducts.length === 1 ? "item" : "items"} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {cartProducts.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={product.quantity}
                  />
                ))}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="order-details">
                    <AccordionTrigger className="py-2">
                      Order Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax</span>
                          <span>${(total * 0.07).toFixed(2)}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${(total + total * 0.07).toFixed(2)}</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}