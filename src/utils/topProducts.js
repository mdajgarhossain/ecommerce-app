export const topProducts = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    title: "Smart Watch Pro",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Electronics",
    description: "Advanced smartwatch with health tracking features"
  },
  {
    id: 3,
    title: "Designer Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Fashion",
    description: "Stylish and durable backpack for everyday use"
  },
  {
    id: 4,
    title: "Portable Speaker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    category: "Electronics",
    description: "Waterproof Bluetooth speaker with amazing sound"
  },
  {
    id: 5,
    title: "Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Sports",
    description: "Comfortable running shoes with excellent support"
  },
  {
    id: 6,
    title: "Coffee Maker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    category: "Home",
    description: "Automatic coffee maker with programmable settings"
  }
];

export function getProductById(id) {
  return topProducts.find(product => product.id === parseInt(id));
}

export function getProductsByCategory(category) {
  return topProducts.filter(product => product.category === category);
}
