export const consolidateProducts = (order) => {
    const uniqueProducts = new Map();

    order.products.forEach((item) => {
        const key = `${item.productId.toString()}-${item.priceAtPurchase}`; 
        if (uniqueProducts.has(key)) {
            uniqueProducts.get(key).quantity += item.quantity;
        } else {
            uniqueProducts.set(key, item);
        }
    });

    return Array.from(uniqueProducts.values());
};
export const calculateAmount = (order) => {
    return order.products.reduce((total, product) => {
        if (!product.priceAtPurchase || !product.quantity) {
            throw new Error(`Producto con datos inválidos: ${product}`);
        }
        return total + product.quantity * product.priceAtPurchase;
    }, 0);
}; 