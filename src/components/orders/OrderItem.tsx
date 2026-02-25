import { OrderItem as OrderItemType } from "@/types/medicine"; // import the new interface

interface Props {
  item: OrderItemType;
}

export default function OrderItem({ item }: Props) {
  const { medicine } = item;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
      <div className="w-16 h-16 bg-linear-to-br from-primary/5 to-secondary/10 rounded-md flex items-center justify-center shrink-0">
        <span className="text-3xl opacity-40">💊</span>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 line-clamp-1">
          {medicine.name}
        </h4>
        <p className="text-sm text-gray-600">
          Unit price: ৳{item.price.toFixed(2)}
        </p>
      </div>

      <div className="text-right">
        <p className="font-medium text-primary">
          ৳{(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          Qty: {item.quantity}
        </p>
      </div>
    </div>
  );
}