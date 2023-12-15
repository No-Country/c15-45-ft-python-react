import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

interface StoreCardProps {
  name: string;
  description: string;
  productsLength: number;
}

function StoreCard({ name, description, productsLength }: StoreCardProps) {
  console.log(productsLength);
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-lg bg-white p-3">
      <div className="relative h-36 w-full">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
          fill
          className="h-full w-full rounded-md object-cover object-center"
          alt="Card Image"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex h-full max-h-20 flex-col items-start self-start overflow-hidden">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <Separator />
      <div className="flex items-center">
        <p className="text-[13px] text-primary">
          Cant. Prod: <span>{productsLength}</span>
        </p>
        <Button variant="outline" size="sm" className="ml-auto">
          Ver Tienda
        </Button>
      </div>
    </div>
  );
}
export default StoreCard;
