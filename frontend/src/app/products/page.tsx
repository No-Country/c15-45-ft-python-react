"use client";
import ButtonToggleView from "@/components/button-see-stores";
import Filters from "@/components/filters";
import ProductCard from "@/components/product-card";
import { useEffect, useState } from "react";
import Link from "next/link";

type ProductObj = {
  id: number;
  product_images: Array<object>;
  titulo: string;
  description: string;
  price: number;
  stock: number;
  sells: number;
  category: string[];
};

const URL = "https://nostorebehind.pythonanywhere.com/ecommerce/products/";
// const URL = "http://localhost:8000/ecommerce/products/";

export default function ProductsPage() {
  const [products, setProducts] = useState<Array<ProductObj>>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("products", data);
        setProducts(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="relative mx-auto flex h-[calc(100vh-68px)] flex-col gap-2.5 px-4 pb-7">
      <div className="flex items-center justify-between">
        <Filters />
        <ButtonToggleView route="stores" />
      </div>
      <section className="pb-5">
        <div className="flex flex-wrap items-center">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="mb-2.5 drop-shadow-lg md:w-1/2 lg:w-1/4"
            >
              <div className="max-h-80 p-1">
                <ProductCard
                  available={product.stock > 0 ? true : false}
                  name={product.titulo}
                  price={product.price}
                  sales={product.sells}
                  description={product.description}
                  images={product.product_images}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
