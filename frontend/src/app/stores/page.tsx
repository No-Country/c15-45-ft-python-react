"use client";
import { useEffect, useState } from "react";
import ButtonToggleView from "@/components/button-see-stores";
import Filters from "@/components/filters";
import StoreCard from "@/components/store-card";
import Link from "next/link";


type ShopObj = {
  user: number;
  products: Array<object>;
  description: string;
  shop_name: string;
  logo: string;
  category: string;
};
const URL = "https://nostorebehind.pythonanywhere.com/ecommerce/shops/";
export default function StoresPage() {
  const [shops, setShops] = useState<Array<ShopObj>>([]);
  const [error, setError] = useState<any | undefined | null>(null);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: Array<ShopObj>) => {
        console.log(data);
        setShops(data);
      })
      .catch((error) => setError(error?.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="relative mx-auto flex h-dvh  flex-col gap-2.5 px-4 pb-7">
      {/* [calc(100vh-58px)]*/}
      <div className="flex items-center justify-between">
        <Filters />
        <ButtonToggleView route="products" />
      </div>
      <section className="pb-5">
        <div className="flex flex-wrap items-center">
          {shops.map((shop: ShopObj) => (
            <Link
              href={`/stores/${shop.user}`}
              key={shop.user}
              className="xs:w-full mb-2.5 drop-shadow-lg sm:w-full md:w-1/2 lg:w-1/4"
            >
              <div key={shop.user} className="h-80 p-1">
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
