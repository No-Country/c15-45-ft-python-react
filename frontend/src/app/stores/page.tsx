"use client";
import { useEffect, useState } from "react";
import ButtonToggleView from "@/components/button-see-stores";
import Filters from "@/components/filters";
import StoreCard from "@/components/store-card";
import Link from "next/link";

// const products = [
//   {
//     id: 1,
//     name: "Tienda 1",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//     productsLength: 10,
//   },
//   {
//     id: 2,
//     name: "Tienda 2",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//     productsLength: 15,
//   },
//   {
//     id: 3,
//     name: "Tienda 3",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//     productsLength: 23,
//   },
//   {
//     id: 4,
//     name: "Tienda 4",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//     productsLength: 5,
//   },
// ];
type ShopObj = {
  products: Array<object>;
  description: string;
  shop_name: string;
  logo: string;
  category: string;
};
const URL = "https://nostorebehind.pythonanywhere.com/ecommerce/shops/";
export default function StoresPage() {
  const [shops, setShops] = useState<Array<ShopObj>>([]);
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
        setShops(data);
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
        <ButtonToggleView route="products" />
      </div>
      <section className="pb-5">
        <div className="flex flex-wrap items-center">
          {shops.map((shop) => (
            <Link
              href={`/stores/${shop.user}`}
              key={shop.id}
              className="mb-2.5 drop-shadow-lg md:w-1/2 lg:w-1/4"
            >
              <div key={shop.id} className="max-h-52 p-1">
                <StoreCard
                  name={shop.shop_name}
                  description={shop.description}
                  productsLength={shop.products.length}
                  shop_logo={shop.logo}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
