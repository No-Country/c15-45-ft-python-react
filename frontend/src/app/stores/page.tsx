import ButtonToggleView from "@/components/button-see-stores";
import Filters from "@/components/filters";
import StoreCard from "@/components/store-card";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Tienda 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    productsLength: 10,
  },
  {
    id: 2,
    name: "Tienda 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    productsLength: 15,
  },
  {
    id: 3,
    name: "Tienda 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    productsLength: 23,
  },
  {
    id: 4,
    name: "Tienda 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    productsLength: 5,
  },
];

export default function StoresPage() {
  return (
    <main className="relative mx-auto flex h-[calc(100vh-68px)] flex-col gap-2.5 px-4 pb-7">
      <div className="flex items-center justify-between">
        <Filters />
        <ButtonToggleView route="products" />
      </div>
      <section className="pb-5">
        <div className="flex flex-wrap items-center">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="w-full drop-shadow-lg md:w-1/2 lg:w-1/4"
            >
              <article key={product.id} className="p-1">
                <StoreCard
                  name={product.name}
                  description={product.description}
                  productsLength={product.productsLength}
                />
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
