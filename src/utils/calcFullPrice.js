export function calcFullPrice(productBasket) {
    const fullPrice = productBasket.reduce((acc, product) => (acc + product.price * product.quantity), 0);
    return fullPrice;
}