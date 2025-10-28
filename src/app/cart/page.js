"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { ShoppingBag, Trash2, CreditCard } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, totalPrice, totalQuantity, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  const handleCheckout = () => {
    setShowCheckout(true);
    // Reset form and errors when opening checkout
    setFormData({
      fullName: "",
      email: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Auto-format expiry date (MM/YY)
    if (name === "expiry") {
      // Remove non-digits
      const digitsOnly = value.replace(/\D/g, "");

      if (digitsOnly.length >= 2) {
        formattedValue = digitsOnly.slice(0, 2) + "/" + digitsOnly.slice(2, 4);
      } else {
        formattedValue = digitsOnly;
      }
    }

    // Only allow digits for card number and CVV
    if (name === "cardNumber" || name === "cvv") {
      formattedValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Card Number validation (16 digits)
    const cardRegex = /^\d{16}$/;
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!cardRegex.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Expiry validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!formData.expiry.trim()) {
      newErrors.expiry = "Expiry date is required";
    } else if (!expiryRegex.test(formData.expiry)) {
      newErrors.expiry = "Format must be MM/YY";
    }

    // CVV validation (3 or 4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompleteOrder = () => {
    if (validateForm()) {
      setCheckoutComplete(true);
      setTimeout(() => {
        clearCart();
        setCheckoutComplete(false);
        setShowCheckout(false);
        setFormData({
          fullName: "",
          email: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
        });
      }, 2000);
    }
  };

  if (checkoutComplete) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your purchase.
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some products to get started
          </p>
          <Link href="/" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Shopping Cart ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <button
            onClick={clearCart}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium cursor-pointer"
          >
            <Trash2 size={20} />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="text-green-600 dark:text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (estimated)</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-gray-200">
                  <span>Total</span>
                  <span>${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <CreditCard size={20} />
              <span>Proceed to Checkout</span>
            </button>

            <Link
              href="/"
              className="block text-center text-blue-600 dark:text-blue-400 hover:underline mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Checkout
            </h2>

            <div className="space-y-4 mb-6">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 outline-none transition-colors`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 outline-none transition-colors`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Card Number */}
              <div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number (16 digits)"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={16}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.cardNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 outline-none transition-colors`}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    maxLength={5}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.expiry
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                    } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 outline-none transition-colors`}
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.cvv
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                    } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 outline-none transition-colors`}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowCheckout(false);
                  setErrors({});
                }}
                className="flex-1 btn-secondary py-3"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteOrder}
                className="flex-1 btn-primary py-3 hover:scale-105 active:scale-95 transition-transform"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
