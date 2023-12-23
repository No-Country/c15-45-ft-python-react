"use client";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductQuantity from "@/components/product-quantity";

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
  // const [subtotalPrice, setSubtotalPrice] = useState<
  //   Array<{ product_id: number; product_subtotal: number }>
  // >([]);

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

  const add_product = (data_qty: number) => {
    data_qty += 1;
    return data_qty;
  };

  const substract_product = (data_qty: number) => {
    if (data_qty > 0) {
      data_qty -= 1;
      return data_qty;
    } else {
      return 0;
    }
  };

  const [subtotalProducts, setSubtotalProduct] = useState<{
    [key: number]: { qty: number; subtotal: number };
  }>({
    ...products?.reduce(
      (acc, product) => ({
        ...acc,
        [product.id]: {
          qty: 1,
          subtotal: 1 * product.price,
        },
      }),
      {},
    ),
  });

  const newSubtotalsProduct = products?.map((product: ProductObj) => ({
    ...subtotalProducts,
    [product.id]: { qty: 1, subtotal: 1 * product.price },
  }));

  // const setSubtotalProduct = (newSubtotalProducts: {
  //   [key: number]: { qty: number; subtotal: number };
  // }) => {
  //   setSubtotalProduct(newSubtotalProducts);
  // };

  const buy_done = (
    <div className="col-span-1 flex justify-center drop-shadow-xl">
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
      <div className="my-6 grid h-[calc(100vh-68px)] w-full grid-cols-6 gap-2 px-4">
        <div className="col-span-1 mb-5 text-xl font-bold drop-shadow-xl">
          <h1 className="rounded bg-amber-100 text-center text-stone-700">
            Carrito
          </h1>
        </div>
        <div className="col-span-4 grid grid-cols-6 gap-2 lg:col-span-2 lg:col-start-3">
          {products?.map((product: ProductObj) => {
            // const qtyProduct = 0;
            // subtotalPrice.map((value) => {
            //   if (value.product_id == product.id) {
            //     value.product_subtotal = qtyProduct * product.price;
            //   }
            // });
            // setSubtotalPrice([...subtotalPrice]);

            return (
              product?.id % 2 == 0 && (
                <article
                  key={product.id}
                  className="col-span-6 mb-2 grid grid-cols-6 rounded-md bg-amber-100 p-2 drop-shadow-xl"
                >
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
                        Inventario: {product.stock}
                      </p>
                    </div>
                    <div className="flex h-full w-full items-end gap-1 justify-self-end">
                      <div className="flex w-full items-center justify-between">
                        <p className="text-md font-bold">
                          $ Precio: <br />
                          {product.price}
                        </p>
                        <p className="text-md font-bold">
                          $ Subtotal: <br />
                          {subtotalProducts[product.id]?.subtotal}
                        </p>
                        <div className="flex h-8 w-20 items-center justify-around rounded-full bg-gray-400 bg-opacity-20 px-2 py-1">
                          {/* <ProductQuantity
                            quantity={qtyProduct}
                            productId={product.id}
                            productStock={product.stock}
                            onQuantityChange={(qty: number) => {
                              subtotalPrice.map((value) => {
                                if (value.product_id == product.id) {
                                  value.product_subtotal = qty * product.price;
                                }
                              });
                              setSubtotalPrice([...subtotalPrice]);
                            }}
                          /> */}
                          <div className="max-w-5 flex items-center justify-center">
                            <Button
                              onClick={() => {
                                setSubtotalProduct((prevSubtotalProduct) => ({
                                  ...prevSubtotalProduct,
                                  [product.id]: {
                                    qty: substract_product(
                                      prevSubtotalProduct[product.id]?.qty,
                                    ),
                                    subtotal:
                                      prevSubtotalProduct[product.id]?.qty *
                                      product.price,
                                  },
                                }));
                              }}
                            >
                              <Minus className="h-3 w-3" strokeWidth={1.5} />
                            </Button>
                          </div>
                          <div className="flex items-center justify-center">
                            <p className="text-sm font-semibold text-primary">
                              {subtotalProducts[product.id]?.qty}
                            </p>
                          </div>
                          <div className="max-w-5 flex items-center justify-center">
                            <Button
                              onClick={() => {
                                setSubtotalProduct((prevSubtotalProduct) => ({
                                  ...prevSubtotalProduct,
                                  [product.id]: {
                                    qty: add_product(
                                      prevSubtotalProduct[product.id]?.qty,
                                    ),
                                    subtotal:
                                      prevSubtotalProduct[product.id]?.qty *
                                      product.price,
                                  },
                                }));
                              }}
                            >
                              <Plus className="h-3 w-3" strokeWidth={1.5} />
                            </Button>
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
          <div className="col-span-1 flex h-7 justify-center drop-shadow-xl">
            <button
              type="button"
              disabled={showAlert}
              onClick={() => setShowAlert(!showAlert)}
              className="w-24 rounded-md bg-orange-300 shadow-lg shadow-orange-300/50"
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
