import { formatPrice } from "../utils/formatPrice";
import { useProducts } from "../hooks/useProducts";
import { calcFullPrice } from "../utils/calcFullPrice";

export default function OrderTotal() {
    const { state } = useProducts();
    const { purchasedProducts:savedProducts} = state;
    const sumOfCart = calcFullPrice(savedProducts);
    
    return (
        <div className="orderTotal-box">
            <p>Order Total</p>
            <p>${formatPrice(sumOfCart)}</p>
        </div>
    );
}