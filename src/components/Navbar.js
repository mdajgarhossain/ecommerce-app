import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          E-Shop
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/cart" className="hover:text-blue-600 transition-colors">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}
