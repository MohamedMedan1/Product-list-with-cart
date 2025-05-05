import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import ProductItem from "./ProductItem";

export default function Products({ state,handleBuyProduct,handleQuantityIncreament,handleQuantityDecreament,handleRemoveProduct}) {
    const {products,screenWidth,error, isLoading} = state;
    return (
    <>
        {error && <ErrorMsg/> }
        {isLoading ? <Loader/> : <ul>
                {products.map((product) => <li key={product.id}>
                    <ProductItem productInfo={product} screenWidth={screenWidth} 
                        handleBuyProduct={handleBuyProduct} handleQuantityIncreament={handleQuantityIncreament}
                        handleQuantityDecreament={handleQuantityDecreament} handleRemoveProduct={handleRemoveProduct} />
                </li>)}
        </ul>}
    </>
    );
}