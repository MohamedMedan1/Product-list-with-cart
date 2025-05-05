export default function OrderTotal({sumOfCart}) {
    return (
        <div className="orderTotal-box">
            <p>Order Total</p>
            <p>${sumOfCart}</p>
        </div>
    );
}