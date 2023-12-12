"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Shirt, Store } from "lucide-react";

interface ButtonToggleViewProps {
  route: "stores" | "products";
}

const ButtonToggleView = ({ route }: ButtonToggleViewProps) => {
  const router = useRouter();
  const icon =
    route === "stores" ? (
      <Store className="mr-2 h-4 w-4" />
    ) : (
      <Shirt className="mr-2 h-4 w-4" />
    );
  const label = route === "stores" ? "Ver tiendas" : "Ver productos";
  const handleClick = () => {
    if (route === "stores") {
      router.push("/stores");
    } else {
      router.push("/products");
    }
  };
  return (
    <Button variant="outline" onClick={handleClick}>
      {icon} {label}
    </Button>
  );
};
export default ButtonToggleView;
