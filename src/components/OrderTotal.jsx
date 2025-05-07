import { formatPrice } from "../utils/formatPrice";
import { calcFullPrice } from "../utils/calcFullPrice";
import { usePurchased } from "../hooks/usePurchased";

export default function OrderTotal() {
    const { purchasedProducts:savedProducts } = usePurchased();
    const sumOfCart = calcFullPrice(savedProducts);
    
    return (
        <div className="orderTotal-box">
            <p>Order Total</p>
            <p>${formatPrice(sumOfCart)}</p>
        </div>
    );
}