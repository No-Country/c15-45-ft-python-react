"use client";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";

interface ImageData {
  id: number;
  image: string;
}

type ProductObj = {
  id: number;
  product_images: Array<ImageData>;
  titulo: string;
  description: string;
  price: number;
  stock: number;
  sells: number;
  category: string[];
};
const URL = "https://nostorebehind.pythonanywhere.com/ecommerce/products/";

const Cart = () => {
  const [products, setProducts] = useState<Array<ProductObj> | undefined>();
  const [error, setError] = useState<any | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: Array<ProductObj> | undefined) => {
        console.log("products", data);
        setProducts(data);
      })
      .catch((error: any) => setError(error?.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const buy_done = (
    <div className="col-span-6 flex justify-center">
      <div role="alert" className="">
        <div className="rounded-t bg-green-500 px-4 py-2 font-bold text-white">
          Compra Exitosa
        </div>
        <div className=" rounded-b border border-t-0 border-green-400 bg-orange-100 px-4 py-3 text-center text-gray-700">
          <p>Gracias por tu compra. Apoyas a futuros grandes empresarios.</p>
          <Link href={`/products/`} className="">
            <strong>Retornar a listado de productos</strong>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="block">
      <div className="my-6 grid h-[calc(100vh-68px)] w-full grid-cols-6 px-4">
        <div className="mb-5 text-xl font-bold">
          <h1>Carrito</h1>
        </div>
        <div className="col-span-6 grid grid-cols-6 gap-2">
          {products?.map((product: ProductObj) => {
            return (
              product?.id % 2 == 0 && (
                <article className="col-span-4 col-start-2 mb-2 grid grid-cols-6 rounded-md bg-amber-100 p-2">
                  <div className="relative col-span-2 h-20 w-20">
                    <Image
                      src={product?.product_images[0]?.image ?? ""}
                      alt="Product Image"
                      className="rounded-md object-cover object-center"
                      fill
                    />
                  </div>
                  <div className="col-span-4 flex h-full flex-col">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-md font-semibold">
                          {product.titulo}
                        </p>
                        <div className="ml-auto h-6 w-6 rounded-full border border-black p-1">
                          <X className="h-full w-full" />
                        </div>
                      </div>
                      <p className="text-sm leading-none text-primary/70">
                        Cantidad: {product.stock}
                      </p>
                    </div>
                    <div className="flex h-full w-full items-end gap-1 justify-self-end">
                      <div className="flex w-full items-center justify-between">
                        <p className="text-md font-bold">$ {product.price}</p>
                        <div className="flex h-8 w-20 items-center justify-around rounded-full bg-gray-400 bg-opacity-20 px-2 py-1">
                          <div className="flex items-center justify-center">
                            <Minus className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                          <div className="flex items-center justify-center">
                            <p className="text-sm font-semibold text-primary">
                              1
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <Plus className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            );
          })}
        </div>
        {showAlert && buy_done}
        {!showAlert && (
          <div className="col-span-6 mt-7 flex h-7 justify-center">
            <button
              type="button"
              // ref={`products/`}
              disabled={showAlert}
              onClick={() => setShowAlert(!showAlert)}
              className="w-24 rounded-md bg-orange-300"
            >
              Comprar
            </button>
          </div>
        )}
      </div>
      <div className="h-24 w-full"></div>
    </div>
  );
};
export default Cart;
