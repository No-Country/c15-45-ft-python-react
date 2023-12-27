"use client";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";

interface ProductQuantity {
  quantity: number;
  productId: number;
  productStock: number;
  onQuantityChange: CallableFunction;
}
const ProductQuantity = ({
  quantity,
  productId,
  productStock,
  onQuantityChange,
}: ProductQuantity) => {
  const [newQuantity, setNewQuantity] = useState<number>(quantity);

  const handleChange = useCallback(
    (e: { target: { value: string; }; }) => {
      let value = parseInt(e.target.value);
      if (value <= 0) {
        value = 0;
      } else if (value > productStock){
        value = productStock;
      }
      setNewQuantity(value);
      onQuantityChange(value);
    },
    [],
  );

  return (
    <div key={productId}>
      <Input
        className=""
        type="number"
        value={newQuantity}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProductQuantity;
