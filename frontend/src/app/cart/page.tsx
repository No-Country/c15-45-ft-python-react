import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

const Cart = () => {
  return (
    <div className="h-[calc(100vh-68px)] w-full px-4">
      <div className="mb-5 text-xl font-bold">
        <h1>Carrito</h1>
      </div>
      <article className="grid grid-cols-6 ">
        <div className="relative col-span-2 h-20 w-20">
          <Image
            src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product Image"
            className="rounded-md object-cover object-center"
            fill
          />
        </div>
        <div className="col-span-4 flex h-full flex-col">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-md font-semibold">Zapatillas Nicke</p>
              <div className="ml-auto h-6 w-6 rounded-full border border-black p-1">
                <X className="h-full w-full" />
              </div>
            </div>
            <p className="text-sm leading-none text-primary/70">Cantidad: 5</p>
          </div>
          <div className="flex h-full w-full items-end gap-1 justify-self-end">
            <div className="flex w-full items-center justify-between">
              <p className="text-md font-bold">$198.00</p>
              <div className="flex h-8 w-20 items-center justify-around rounded-full bg-gray-400 bg-opacity-20 px-2 py-1">
                <div className="flex items-center justify-center">
                  <Minus className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-sm font-semibold text-primary">1</p>
                </div>
                <div className="flex items-center justify-center">
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
export default Cart;
