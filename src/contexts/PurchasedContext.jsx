import { createContext,useState, useEffect, useCallback, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";

const PurchasedContext = createContext();

function PurchasedProvider({children}) {
    const {handleStartNewOrder} = useProducts();
    const [purchasedProducts, setPurchasedProducts] = useState(() => {
        return (localStorage.getItem("Products") && JSON.parse(localStorage.getItem("Products")).length > 0) ? JSON.parse(localStorage.getItem("Products")) : []; 
    });
    
    const handleAddProduct = useCallback( (newProduct) =>  {
        setPurchasedProducts((lastestProducts) => [...lastestProducts, newProduct]);
    },[])

    const handleRemoveProduct = useCallback((productId) => {
        setPurchasedProducts((lastestProducts) => lastestProducts.filter((product) => product.id !== productId));
    }, []);

    const handleSearchProduct = useCallback((productId) => {
        return purchasedProducts.find((product) => product.id === productId);
    }, [purchasedProducts]);

    
    const handleIncreaseQuantity = useCallback((productId) => {
        setPurchasedProducts((latestProducts) => latestProducts.map((product) => product.id === productId ? { ...product, quantity: product.quantity + 1 } : product));
    }, []);

    const handleDecreaseQuantity = useCallback((productId) => {
        setPurchasedProducts((latestProducts) => latestProducts.map((product) => product.id === productId ?
            product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : handleRemoveProduct(productId)
            : product))
    },[handleRemoveProduct])
    
    const handleConfirmOrder = useCallback(() => {
        setPurchasedProducts([]);
        handleStartNewOrder();
    },[handleStartNewOrder])
    
    useEffect(() => {
        localStorage.setItem("Products", JSON.stringify(purchasedProducts));
    },[purchasedProducts])
    
    const globalState = useMemo(() => {
        return {
            purchasedProducts,
            handleAddProduct,
            handleRemoveProduct,
            handleSearchProduct,
            handleIncreaseQuantity,
            handleDecreaseQuantity,
            handleConfirmOrder
        }
    }, [purchasedProducts,handleAddProduct,handleConfirmOrder,handleDecreaseQuantity,handleIncreaseQuantity,handleRemoveProduct,handleSearchProduct]);

    return (
    <PurchasedContext.Provider value={globalState}>
            {children}
    </PurchasedContext.Provider>
    );
}

export { PurchasedContext, PurchasedProvider };