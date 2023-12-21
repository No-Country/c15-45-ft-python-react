"use client";
import { useEffect, useState } from "react";
import ButtonToggleView from "@/components/button-see-stores";
import Filters from "@/components/filters";
import ProductCard from "@/components/product-card";
import Link from "next/link";

// const products = [
//   {
//     id: 1,
//     name: "Producto 1",
//     price: 100,
//     available: true,
//     sales: 10,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita earum obcaecati reprehenderit ipsam modi dolores quas ipsa distinctio, aperiam deserunt voluptas numquam non enim incidunt. Quasi voluptas eos non impedit",
//   },
//   {
//     id: 2,
//     name: "Producto 2",
//     price: 200,
//     available: true,
//     sales: 20,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita earum obcaecati reprehenderit ipsam modi dolores quas ipsa distinctio, aperiam deserunt voluptas numquam non enim incidunt. Quasi voluptas eos non impedit",
//   },
//   {
//     id: 3,
//     name: "Producto 3",
//     price: 300,
//     available: false,
//     sales: 30,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita earum obcaecati reprehenderit ipsam modi dolores quas ipsa distinctio, aperiam deserunt voluptas numquam non enim incidunt. Quasi voluptas eos non impedit",
//   },
//   {
//     id: 4,
//     name: "Producto 4",
//     price: 400,
//     available: true,
//     sales: 40,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita earum obcaecati reprehenderit ipsam modi dolores quas ipsa distinctio, aperiam deserunt voluptas numquam non enim incidunt. Quasi voluptas eos non impedit",
//   },
// ];
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

// const URL = "https://nostorebehind.pythonanywhere.com/ecommerce/products/";
const URL = "https://localhost:3000/ecommerce/products/";

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
        console.log(data);
        setProducts(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="relative flex h-[calc(100vh-68px)] flex-col gap-2.5 px-4 pb-7">
      <div className="flex items-center justify-between">
        <Filters />
        <ButtonToggleView route="stores" />
      </div>
      <section className="h-full w-full">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="drop-shadow-lg"
          >
            <div className="py-1">
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
      </section>
    </main>
  );
}
