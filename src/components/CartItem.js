import Image from 'next/image';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Image 
        src={item.image} 
        alt={item.title} 
        width={80}
        height={80}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="px-3 py-1 border rounded"
        >
          -
        </button>
        <span className="px-4">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="px-3 py-1 border rounded"
        >
          +
        </button>
      </div>
      <button 
        onClick={() => onRemove(item.id)}
        className="text-red-600 hover:text-red-800"
      >
        Remove
      </button>
    </div>
  );
}
