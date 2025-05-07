export function calcFullPrice(productBasket) {
    const fullPrice = productBasket ? productBasket.reduce((acc, product) => (acc + product.price * product.quantity), 0):0;
    return fullPrice;
}