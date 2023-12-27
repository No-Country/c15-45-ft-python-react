"use client";
import ProductCard from "@/components/product-card";
// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft /*Minus, Plus*/ } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ImageData {
  id: number;
  image: string;
}
type ProductObj = {
  id: number;
  name: string;
  price: number;
  stock: number;
  sells: number;
  description: string;
  product_images: Array<ImageData>;
};

type ShopObj = {
  user: number; // id
  products: Array<ProductObj>;
  shop_name: string;
  description: string;
  logo: string;
  category: string;
};

const ShopDetail = ({ params }: { params: { id: string } }) => {
  const URL = `https://nostorebehind.pythonanywhere.com/ecommerce/shops/${params.id}`;
  const [shop, setShop] = useState<ShopObj | null>(null);
  const [error, setError] = useState<any | undefined | null>(null);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: ShopObj | null) => {
        console.log("shops", data);
        setShop(data);
      })
      .catch((error: any) => setError(error?.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!shop) {
    return <h1>Tienda no encontrada</h1>;
  }
  const { description, products, shop_name, logo } = shop;

  return (
    <article className="overflow-hiden mx-auto h-auto w-3/4"> {/* h-[calc(100vh-68px)] max-h-[calc(100vh-68px)]*/}
      <div className="relative h-96 w-full">
        <Image
          src={logo}
          alt="Shop Logo"
          layout="fill"
          className="object-contain object-center"
        />
        <div className="absolute left-2 top-2 ">
          <div className="grid h-8 w-8 place-content-center rounded-full bg-white">
            <Link href={`/stores`}>
              <ChevronLeft />
            </Link>
          </div>
        </div>
      </div>
      <div className="relative z-10 -mt-8 h-auto w-full rounded-t-xl bg-white px-4 py-5 drop-shadow-xl">
        <div className="grid grid-cols-6 items-center">
          <div className="col-span-4 self-start">
            <h1 className="text-xl font-bold">{shop_name}</h1>
            <p className="text-sm text-primary">
              Productos:{" "}
              <span className="font-semibold">{products?.length}</span>
            </p>
          </div>
        </div>
        <div className="my-3 flex flex-col justify-center gap-2">
          <h1 className="text-md font-semibold">Description</h1>

          <p className="text-sm text-primary/80">{description}</p>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-wrap items-center justify-center">
          {products.map((product: ProductObj) => (
            <div className="xs:w-full mb-2.5 max-h-80 p-1 drop-shadow-lg sm:w-full md:w-1/2 lg:w-1/4">
              <ProductCard
                id={product.id}
                name={product?.name}
                price={product?.price}
                available={product?.stock > 0 ? true : false}
                sales={product?.sells}
                description={product?.description}
                images={product?.product_images}
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
export default ShopDetail;
