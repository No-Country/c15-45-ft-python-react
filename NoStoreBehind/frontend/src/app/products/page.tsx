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
    sales: 10,
  },
  {
    id: 2,
    name: "Producto 2",
    price: 200,
    available: true,
    sales: 20,
  },
  {
    id: 3,
    name: "Producto 3",
    price: 300,
    available: false,
    sales: 30,
  },
  {
    id: 4,
    name: "Producto 4",
    price: 400,
    available: true,
    sales: 40,
  },
];

export default function ProductsPage() {
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
                available={product.available}
                name={product.name}
                price={product.price}
                sales={product.sales}
              />
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
