import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";
const products = [
  {
    id: 1,
    name: "Producto 1",
    price: 100,
    available: true,
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    sales: 10,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Producto 2",
    price: 200,
    available: true,
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    sales: 20,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Producto 3",
    price: 300,
    available: false,
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    sales: 30,
    image:
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Producto 4",
    price: 400,
    available: true,
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    sales: 40,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = products.find((product) => product.id === +params.id);
  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }
  const { name, price, available, sales, description, image } = product;
  const avalaible = available ? (
    <p className="text-sm font-semibold text-green-600">Disponible</p>
  ) : (
    <p className="text-sm font-semibold text-red-600">Sin Stock</p>
  );
  return (
    <article className="h-[calc(100vh-68px)] max-h-[calc(100vh-68px)] w-full overflow-hidden">
      <div className="relative h-96 w-full">
        <Image
          src={image}
          alt="Product Image"
          layout="fill"
          className="object-cover object-center"
        />
        <div className="absolute left-2 top-2 ">
          <div className="grid h-8 w-8 place-content-center rounded-full bg-white">
            <ChevronLeft />
          </div>
        </div>
      </div>
      <div className="relative z-10 -mt-8 h-full w-full rounded-t-xl bg-white px-4 py-5 drop-shadow-xl">
        <div className="grid grid-cols-6 items-center">
          <div className="col-span-4 self-start">
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-sm text-primary/70">Nombre Tienda</p>
            <p className="text-sm text-primary">
              Ventas: <span className="font-semibold">{sales}</span>
            </p>
          </div>
          <div className="col-span-2 self-baseline justify-self-end">
            <div className="grid h-8 w-20 grid-cols-3 rounded-full bg-gray-400 bg-opacity-40 px-2 py-1">
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
            <div className="pt-2">
              <div className="text-right">{avalaible}</div>
            </div>
          </div>
        </div>
        <div className="my-3 flex flex-col justify-center gap-2">
          <h1 className="text-md font-semibold">Description</h1>

          <p className="text-sm text-primary/80">{description}</p>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-baseline justify-between">
            <p className="text-lg font-semibold text-primary">Precio Total</p>
            <p className="text-xl font-bold text-primary">${price}</p>
          </div>
          <Button className="w-full">Agregar al carrito</Button>
        </div>
      </div>
    </article>
  );
};
export default ProductDetail;
