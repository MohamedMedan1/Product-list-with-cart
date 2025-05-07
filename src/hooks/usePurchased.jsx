import { useContext } from "react";
import { PurchasedContext } from "../contexts/PurchasedContext";

export function usePurchased() {
    const purchased = useContext(PurchasedContext);
    return purchased;
}