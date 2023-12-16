"use client";

import { Menu, ShoppingBasket } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) return null;
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav>
      {/* menu icon */}
      {/* logo */}
      {/* menu */}
      <div className="flex items-center justify-between px-5 py-5">
        {/* <Menu className="h-6 w-6 sm:h-8 sm:w-8" /> */}
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-6 w-6 hover:cursor-pointer sm:h-8 sm:w-8">
              Open
            </Menu>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Ajustes</SheetTitle>
              <SheetDescription>
                Realiza diversos ajustes de la pagina
              </SheetDescription>
            </SheetHeader>
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
        <p className="text-lg font-semibold sm:text-xl">
          Bienvenid@, {session?.user.name}
        </p>
        <Link href="/cart">
          <ShoppingBasket className="h-6 w-6 sm:h-8 sm:w-8" />
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
