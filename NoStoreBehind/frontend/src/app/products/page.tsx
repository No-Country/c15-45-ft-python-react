import ButtonToggleView from "@/components/button-see-stores";
import Filters from "@/components/filters";
import ProductCard from "@/components/product-card";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Producto 1",
    price: 100,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 10,
  },
  {
    id: 2,
    name: "Producto 2",
    price: 200,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 20,
  },
  {
    id: 3,
    name: "Producto 3",
    price: 300,
    available: false,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 30,
  },
  {
    id: 4,
    name: "Producto 4",
    price: 400,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 40,
  },
  {
    id: 5,
    name: "Producto 5",
    price: 500,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 50,
  },
  {
    id: 6,
    name: "Producto 6",
    price: 600,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 60,
  },
  {
    id: 7,
    name: "Producto 7",
    price: 700,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 70,
  },
  {
    id: 8,
    name: "Producto 8",
    price: 800,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 80,
  },
  {
    id: 9,
    name: "Producto 9",
    price: 900,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 90,
  },
  {
    id: 10,
    name: "Producto 10",
    price: 1000,
    available: true,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sales: 100,
  },
];

export default function ProductsPage() {
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
              className="w-full drop-shadow-lg md:w-1/2 lg:w-1/4"
            >
              <div className="p-1">
                <ProductCard
                  available={product.available}
                  name={product.name}
                  price={product.price}
                  sales={product.sales}
                  description={product.description}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
