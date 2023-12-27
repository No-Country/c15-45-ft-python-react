"use client";
import ButtonToggleView from "@/components/button-see-stores";
import Filters from "@/components/filters";
import ProductCard from "@/components/product-card";
import { useEffect, useState } from "react";

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
// const URL = "http://localhost:8000/ecommerce/products/";

export default function ProductsPage() {
  const [products, setProducts] = useState<Array<ProductObj>>([]);
  const [error, setError] = useState<any | undefined | null>(null);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: Array<ProductObj>) => {
        setProducts(data);
      })
      .catch((error: any) => setError(error?.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="h-dvh relative mx-auto flex flex-col gap-2.5 px-4 pb-7">
      <div className="flex items-center justify-between">
        <Filters />
        <ButtonToggleView route="stores" />
      </div>
      <section className="pb-5">
        <div className="flex flex-wrap items-center">
          {products.map((product) => (
            <div className="xs:w-full mb-2.5 h-80 p-1 drop-shadow-lg sm:w-full md:w-1/2 lg:w-1/4">
              <ProductCard
                id={product.id}
                available={product.stock > 0}
                name={product.titulo}
                price={product.price}
                sales={product.sells}
                description={product.description}
                images={product.product_images}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
