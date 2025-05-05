import { useContext } from 'react'
import { ProductsContext } from '../contexts/ProductsContext';
export function useProducts() {
    const products = useContext(ProductsContext);
    return products;
}