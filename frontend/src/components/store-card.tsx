import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

interface StoreCardProps {
  name: string;
  description: string;
  productsLength: number;
  shop_logo: string;
}

function StoreCard({
  name,
  description,
  productsLength,
  shop_logo,
}: StoreCardProps) {
  console.log(shop_logo);
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-lg bg-amber-100 p-3">
      <div className="relative h-36 w-full">
        <Image
          src={shop_logo}
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
        <div className="flex flex-nowrap items-center justify-center justify-between">
          <p className="text-[13px] text-primary">
            Cant. Prod: <span>{productsLength}</span>
          </p>
          <Button variant="outline" size="sm" className="ml-auto">
            Ver Tienda
          </Button>
        </div>
      </div>
    </div>
  );
}
export default StoreCard;
