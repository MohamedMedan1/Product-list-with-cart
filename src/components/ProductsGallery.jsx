import ProductTitle from "./ProductTitle";
import Products from "./Products";

export default function ProductsGallery({state,handleBuyProduct,handleQuantityIncreament,handleQuantityDecreament,handleRemoveProduct}) {
    return (
        <div>
            <ProductTitle/>
            <Products state={state} handleBuyProduct={handleBuyProduct} handleRemoveProduct={handleRemoveProduct}
                handleQuantityIncreament={handleQuantityIncreament} handleQuantityDecreament={handleQuantityDecreament} />
        </div>
    );
}