"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Carousel } from "@material-tailwind/react";

type ProductObj = {
  id: number;
  product_images: Array<{ id: number; image: string }>;
  titulo: string;
  description: string;
  price: number;
  stock: number;
  sells: number;
  shop: number;
  category: string[];
};

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const URL = `https://nostorebehind.pythonanywhere.com/ecommerce/products/${params.id}`;
  const [product, setProduct] = useState<ProductObj | undefined>();
  const [error, setError] = useState<any | undefined>();

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: ProductObj | undefined) => {
        console.log("products", data);
        setProduct(data);
      })
      .catch((error: any | undefined) => setError(error?.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }
  const { titulo, price, stock, sells, description, product_images, shop } =
    product;
  const available =
    stock > 0 ? (
      <p className="text-sm font-semibold text-green-600">Disponible</p>
    ) : (
      <p className="text-sm font-semibold text-red-600">Sin Stock</p>
    );

  const carouselImgs = (
    <Carousel
      placeholder={titulo}
      transition={{ duration: 2 }}
      className="rounded-xl"
    >
      {/* Items */}
      {product_images.map((image_data) => {
        console.log(image_data.image);
        return (
          <Image
            src={image_data?.image}
            alt="Product Image"
            layout="fill"
            className="h-full w-full rounded-md object-contain object-center"
          />
        );
      })}
    </Carousel>
  );

  return (
    <article className="mx-auto h-[calc(100vh-68px)] max-h-[calc(100vh-68px)] w-3/4 overflow-hidden">
      <div className="relative h-96 w-full">
        {carouselImgs}
        <div className="absolute left-2 top-2 ">
          <div className="grid h-8 w-8 place-content-center rounded-full bg-white">
            <Link href={`/products`}>
              <ChevronLeft />
            </Link>
          </div>
        </div>
      </div>
      <div className="relative z-10 -mt-8 h-1/2 w-full rounded-t-xl bg-white px-4 py-5 drop-shadow-xl">
        <div className="grid grid-cols-6 items-center">
          <div className="col-span-4 self-start">
            <h1 className="text-xl font-bold">{titulo}</h1>
            <p className="text-sm text-primary">
              Ventas: <span className="font-semibold">{sells}</span>
            </p>
          </div>
          <div className="col-span-2 self-baseline justify-self-end">
            <div className="grid h-8 w-20 grid-cols-3 rounded-full bg-gray-400 bg-opacity-40 px-2 py-1">
              <div className="flex items-center justify-center">
                <Minus className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <div className="flex items-center justify-center">
                <p className="text-sm font-semibold text-primary">1</p>
              </div>
              <div className="flex items-center justify-center">
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </div>
            </div>
            <div className="pt-2">
              <div className="text-right">{available}</div>
            </div>
          </div>
        </div>
        <div className="my-3 flex flex-col justify-center gap-2">
          <h1 className="text-md font-semibold">Descripción</h1>
          <p className="text-sm text-primary/80">{description}</p>
          <Link href={`/stores/${shop}`} key={shop} className="text-center">
            <p className="w-24 rounded-full bg-green-100 text-sm text-primary/70">
              <strong>Ver Tienda</strong>
            </p>
          </Link>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-baseline justify-between">
            <p className="text-lg font-semibold text-primary">Precio Total</p>
            <p className="text-xl font-bold text-primary">${price}</p>
          </div>
          <Button className="w-full">
            <Link href={`/cart`}>Agregar al carrito</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
export default ProductDetail;
