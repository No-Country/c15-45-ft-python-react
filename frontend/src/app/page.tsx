import ProductsPage from "@/app/products/page";
// import ButtonToggleView from "@/components/button-see-stores";
// import Filters from "@/components/filters";
// import ProductCard from "@/components/product-card";
// import Link from "next/link";


export default function HomePage() {
  return (
    <ProductsPage />
    // <main className="relative flex h-[calc(100vh-68px)] flex-col gap-2.5 px-4 pb-7">
    //   <div className="flex items-center justify-between">
    //     <Filters />
    //     <ButtonToggleView route="stores" />
    //   </div>
    //   <section className="h-full w-full">
    //     {products.map((product) => (
    //       <Link
    //         href={product.id.toString()}
    //         key={product.id}
    //         className="drop-shadow-lg"
    //       >
    //         <div className="py-1">
    //           <ProductCard
    //             available={product.available}
    //             name={product.name}
    //             price={product.price}
    //             sales={product.sales}
    //           />
    //         </div>
    //       </Link>
    //     ))}
    //   </section>
    // </main>
  );
}
