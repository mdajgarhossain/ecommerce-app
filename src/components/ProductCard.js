"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Check if product is in cart
  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);

    // Reset button state after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <div className="card overflow-hidden group">
      {/* Image Container */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.category}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {product.rating?.rate || "N/A"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({product.rating?.count || 0})
          </span>
        </div>

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              isAdding
                ? "bg-green-500 text-white scale-95"
                : isInCart
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
                : "btn-primary"
            }`}
          >
            <ShoppingCart size={18} />
            <span>{isAdding ? "Added!" : isInCart ? "In Cart" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
