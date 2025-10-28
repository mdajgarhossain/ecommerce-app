export default function ProductDetail({ params }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Product Detail Page</h1>
      <p>Product ID: {params.id}</p>
    </div>
  );
}
