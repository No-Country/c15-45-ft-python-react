"use client";

import { Menu, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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
        <p className="text-lg font-semibold sm:text-xl">
          Bienvenid@,{" "}
          {session ? `${session.user.name}` : "Ingresa o regístrate"}
        </p>
        <Link href="/cart">
          <ShoppingBasket className="h-6 w-6 sm:h-8 sm:w-8 bg-amber-200 rounded-full" />
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
