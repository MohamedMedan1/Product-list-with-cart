import {memo, useEffect, useState } from "react";
import Button from "./Button";
import { formatPrice } from "../utils/formatPrice";
import { usePurchased } from "../hooks/usePurchased";

const ProductItem = memo(function ProductItem({ productInfo }) {
    const {purchasedProducts,handleAddProduct, handleRemoveProduct, handleSearchProduct, handleIncreaseQuantity, handleDecreaseQuantity} = usePurchased(); 
    const { image, name, category, price, id } = productInfo;
    const isSelected = Boolean(handleSearchProduct(id));
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const index = purchasedProducts.length > 0 ? purchasedProducts.findIndex((product) => product.id === id) : 1;
    
    useEffect(() => {
        const handleReSize = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleReSize);
        return () => window.removeEventListener('resize', handleReSize);
    }, []);

    
    function handleGetMore() {
        handleIncreaseQuantity(id);
    }
    
    function handleGetLess() {
        if (index === -1) return;
        if (purchasedProducts[index].quantity === 1) {
            handleRemoveProduct(id);
            return;
        }
        handleDecreaseQuantity(id);
    }

    return (
        <div>
            <div className="product-img-box">
                <img src={screenWidth >= 767 ? image.desktop : image.mobile} alt={name} />
                {isSelected
                    ?
                    <Button className="add-product">
                        <div className="ctrl-btn" onClick={handleGetLess}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z" /></svg>
                        </div>
                        <span>{purchasedProducts[index].quantity}</span>
                        <div className="ctrl-btn" onClick={handleGetMore}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" /></svg>
                        </div>
                    </Button>
                    : <Button onClickHandler={() => handleAddProduct({ image:image.thumbnail,name, price, quantity: 1, id})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clipPath="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" /><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" /></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z" /></clipPath></defs></svg>
                        <span>Add to cart</span>
                    </Button>
                }
            </div>
            <div className="product-Info">
                <p>{category}</p>
                <p>{name}</p>
                <p>${formatPrice(price)}</p>
            </div>
        </div>
    );
})

export default ProductItem;