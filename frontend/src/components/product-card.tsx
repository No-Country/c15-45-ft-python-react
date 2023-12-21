import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  available: boolean;
  sales: number;
  description: string;
  images: Array<object>;
}

function ProductCard({
  name,
  price,
  available,
  sales,
  description,
  images,
}: ProductCardProps) {
  const avalaible = available ? (
    <p className="text-sm text-green-600">Disponible</p>
  ) : (
    <p className="text-sm text-red-600">Sin Stock</p>
  );
  console.log("product", images);
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-lg bg-white p-3 ">
      <div className="relative h-36 w-full">
        <Image
          src="https://nostorebehind.pythonanywhere.com/media/images/products/_b23fcb61-0550-4205-b6c8-0470364a0e46.jpeg"
          fill
          className="h-full w-full rounded-md object-cover object-center"
          alt="Card Image"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex h-full flex-col items-start self-start">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm ">
              Precio: <span className="text-gray-500">${price}</span>
            </p>
          </div>
          <div className="flex flex-col items-center">
            {avalaible}
            <p className="ml-2 text-sm text-gray-500">Ventas: {sales}</p>
          </div>
        </div>
        <p className="hidden text-primary/70 sm:block">{description}</p>
      </div>
      <Button variant="outline" className="w-full justify-center">
        <ShoppingCart className="m-4 mr-2 h-4" /> Agregar al carrito
      </Button>
    </div>
  );
}
export default ProductCard;
