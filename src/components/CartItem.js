"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="card p-4 flex gap-4">
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="96px"
          className="object-contain p-2"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {item.category}
          </p>
        </div>

        {/* Price and Controls */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${(item.price * item.quantity).toFixed(2)}
          </span>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity === 1}
              className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <span className="w-8 text-center font-semibold text-gray-800 dark:text-gray-200">
              {item.quantity}
            </span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>

            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-2 p-1 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
