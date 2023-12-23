import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ImageData {
  id: number;
  image: string;
}
interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  available: boolean;
  sales: number;
  description: string;
  images: Array<ImageData>;
}

function ProductCard({
  id,
  name,
  price,
  available,
  sales,
  description,
  images,
}: ProductCardProps) {

  const router = useRouter();
  const text_stock = available ? (
    <p className="text-sm text-green-600">Disponible</p>
  ) : (
    <p className="text-sm text-red-600">Sin Stock</p>
  );

  const handleClick = () => {
    router.push("/cart");
  };

  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-lg bg-amber-100 p-3 ">
      <Link href={`/products/${id}`} key={id} className="">
        <div className="relative h-36 w-full">
          <Image
            src={images[0]?.image ?? ""}
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
                Precio: <span className="text-gray-500">$ {price}</span>
              </p>
            </div>
            <div className="flex flex-col items-center">
              {text_stock}
              <p className="ml-2 text-sm text-gray-500">Ventas: {sales}</p>
            </div>
          </div>
          <p className="hidden truncate text-primary/70 sm:block">
            {description}
          </p>
        </div>
      </Link>
      <Button
        variant="outline"
        className="mx-auto w-3/4 justify-center"
        onClick={handleClick}
      >
        <div className="flex flex-nowrap items-center justify-center">
          <ShoppingCart className="m-4 mr-2 h-4" />
          <span>Agregar al carrito</span>
        </div>
      </Button>
    </div>
  );
}
export default ProductCard;
