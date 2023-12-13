import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  available: boolean;
  sales: number;
}

function ProductCard({ name, price, available, sales }: ProductCardProps) {
  const avalaible = available ? (
    <p className="text-sm text-green-600">Disponible</p>
  ) : (
    <p className="text-sm text-red-600">Sin Stock</p>
  );
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-lg bg-white p-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex h-full flex-col items-start self-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm ">
            Precio: <span className="text-gray-500">${price}</span>
          </p>
          <div className="flex items-center pt-2">
            {avalaible}
            <p className="ml-2 text-sm text-gray-500">Ventas: {sales}</p>
          </div>
        </div>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
          width={100}
          height={100}
          className="rounded-md"
          alt="Card Image"
        />
      </div>
      <Button variant="outline" className="w-full justify-start">
        <ShoppingCart className="m-4 mr-2 h-4" /> Agregar al carrito
      </Button>
    </div>
  );
}
export default ProductCard;
