"use client";
import { Separator } from "@/components/ui/separator";
import { Filter } from "lucide-react";
import { Combobox } from "@/components/ui/combo-box";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { OrderBy } from "@/components/order-by";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

function Filters() {
  const [price, setPrice] = useState<number[]>([0, 100]);

  return (
    <Sheet>
      <SheetTrigger className="items-tart flex">
        <div className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
        </div>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <h3 className="text-xl font-semibold">Filtros</h3>
        </SheetHeader>
        <header className="flex items-center gap-2.5"></header>
        <Separator className="my-3" />
        <section>
          <div className="grid space-y-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Categoria producto:</Label>
              <Combobox width="w-[284px]" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Ciudad:</Label>
              <Combobox width="w-[284px]" />
            </div>
            <div className="grid grid-cols-2 grid-rows-3 gap-x-2">
              <div className="col-span-2">
                <Label htmlFor="price" className=" h-min self-end">
                  Rango de Precio:
                </Label>
              </div>
              <div className="col-span-2 row-span-2 flex gap-2">
                <div className="w-full">
                  <Input
                    id="price"
                    type="number"
                    placeholder="Desde"
                    value={price[0]}
                  />
                </div>
                <div className="w-full">
                  <Input
                    id="price"
                    type="number"
                    placeholder="Hasta"
                    value={price[1]}
                  />
                </div>
              </div>
            </div>

            <div className="!my-3 !mb-5">
              <Slider
                max={100}
                min={0}
                minStepsBetweenThumbs={1}
                step={1}
                value={price}
                onValueChange={(newPrice) => setPrice(newPrice)}
                // formatLabel={(value) => `$${value}`}
              />
            </div>
            <OrderBy />
            <Button className="uppercase">Filtrar</Button>
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
}
export default Filters;
