"use client";

import { Menu, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import logoImage from "../../public/images/nsb-logo.jpeg";
import Image from "next/image";

function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") return null;
  return (
    <nav>
      {/* menu icon */}
      {/* logo */}
      {/* menu */}
      <div className="flex items-center justify-between px-5 py-5">
        <Menu className="h-6 w-6 sm:h-8 sm:w-8" />
        <div className="text-amber-100 drop-shadow-xl">
          {/* <Image
            src={logoImage.src}
            alt="NSB Logo"
            layout="fill"
            className="h-full w-full rounded-md object-contain"
          /> */}
          <h1 className="text-lg font-semibold sm:text-xl">
            Bienvenid@,{" "}
            {session ? `${session.user.name}` : "Ingresa o regístrate"}
          </h1>
        </div>
        <Link href="/cart">
          <ShoppingBasket className="h-6 w-6 rounded-full bg-amber-200 drop-shadow-xl sm:h-8 sm:w-8" />
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
