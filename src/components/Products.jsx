import { useProducts } from "../hooks/useProducts";
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import ProductItem from "./ProductItem";

export default function Products() {
    const { state} = useProducts();
    const { error, isLoading, products } = state;
    console.log(products);
    return (
    <>
        {error && <ErrorMsg/> }
        {isLoading ? <Loader/> : <ul>
                {products.map((product) => <li key = {product.id}>
                    <ProductItem productInfo={product}/>
                </li>)}
        </ul>}
    </>
    );
}