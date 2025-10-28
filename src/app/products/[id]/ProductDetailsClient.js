"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star, ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

export default function ProductDetailsClient({ product }) {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div>
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </Link>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in z-50">
          <Check size={20} />
          <span>Added to cart successfully!</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="card p-8">
          <div className="relative h-96 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Category Badge */}
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-semibold px-4 py-2 rounded-full capitalize">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating?.rate || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {product.rating?.rate || "N/A"} ({product.rating?.count || 0}{" "}
              reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Quantity:
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-3"
          >
            <ShoppingCart size={24} />
            <span>{isInCart ? "Add More to Cart" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
