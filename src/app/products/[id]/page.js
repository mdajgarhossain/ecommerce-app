import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";
import axios from "axios";

// Generate static paths for all products
export async function generateStaticParams() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    return [];
  }
}

// Fetch product data at build time
export async function generateMetadata({ params }) {
  const { id } = await params; // Await params here

  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const product = response.data;

    return {
      title: `${product.title} - Shopping Hub`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: "Product Not Found - Shopping Hub",
    };
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params; // Await params here

  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const product = response.data;

    if (!product) {
      notFound();
    }

    return <ProductDetailsClient product={product} />;
  } catch (error) {
    notFound();
  }
}
