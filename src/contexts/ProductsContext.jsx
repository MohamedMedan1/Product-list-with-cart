import { useReducer, useEffect, createContext} from "react";

const initialState = {
    screenWidth : window.screen.availWidth,
    products: [],
    purchasedProducts: [],
    isConfirming: false,
    isLoading: false,
    error: "",
}

function reducer(state, action ) {
    switch (action.type) {
        case "productsLoading":
            return { ...state, isLoading: true };
        case "screenWidthChanging":
            return { ...state, screenWidth:action.payload};
        case "setProducts":
            return { ...state, products:action.payload};
        case "saveProductInCart":
            return { ...state,purchasedProducts: [...state.purchasedProducts,action.payload]};
        case "setProductAsSelected":
            return { ...state,products:state.products.map((product) => product.id === action.payload ? {...product,isSelected:true}:product)};
        case "setProductAsNotSelected":
            return { ...state,products:state.products.map((product) => product.id === action.payload ? {...product,isSelected:false}:product)};
        case "removePurchasedProduct":
            return { ...state,purchasedProducts: state.purchasedProducts.filter((product) => product.id != action.payload)};
        case "loadingFinished":
            return { ...state,isLoading:false};
        case "increaseQuantity":
            return { ...state,purchasedProducts: state.purchasedProducts.map((product) => product.id === action.payload? {...product,quantity: product.quantity + 1 }: product )};
        case "decreaseQuantity":
        return {
            ...state, purchasedProducts: state.purchasedProducts.map((product) => (product.id === action.payload && product.quantity > 1) ?
            { ...product, quantity: product.quantity - 1 }: product)
        };
        case "confirmOrder":
        return{...state,isConfirming:true};
        case "startNewOrder":
        return{...state,purchasedProducts: [],isConfirming: false,isLoading: false,error: "",products:state.products.map( product => ({...product,isSelected:false}))};
        default:
            return { ...state,error:action.payload};
    }
}

const ProductsContext= createContext();

function ProductsProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {isConfirming} = state;
        
    useEffect(() => {
        async function getProducts() {
        try {
            dispatch({ type: "productsLoading" });
                const res = await fetch("http://localhost:9000/items");
                const data = await res.json();
                if (data.length === 0) throw new Error("Something went wrong while request");
                const updatedProduct = data.map(product => ({...product,isSelected:false}));   
                dispatch({type:"setProducts",payload: updatedProduct}); 
            }
            catch (error){
                dispatch({type:"fetchingFailed",payload:error});
            }
            finally {
                dispatch({ type: "loadingFinished"});
            }
        }
        getProducts();
    },[]);
        
        
    useEffect(() => {
        const handleReSize = () => {
            dispatch({ type: "screenWidthChanging", payload: window.innerWidth });
        }
        window.addEventListener('resize', handleReSize);
        return () => window.removeEventListener('resize', handleReSize);
    }, []);
        
    function handleBuyProduct(product) {
        console.log(product);
        dispatch({ type: "saveProductInCart", payload: product });
        dispatch({type:"setProductAsSelected",payload:product.id});
    }
        
    function handleRemoveProduct(productId) {
        dispatch({type:"setProductAsNotSelected",payload:productId});
        dispatch({type:"removePurchasedProduct",payload:productId});
    }
        
    function handleQuantityIncreament(productId) {
        dispatch({type:"increaseQuantity",payload:productId});
    }
        
    function handleQuantityDecreament(productId) {
        dispatch({type:"decreaseQuantity",payload:productId});
    }
        
    function handledConfirmOrder() {
        window.scroll({
        top: 0,
        behavior:"smooth"
        })
        dispatch({type:"confirmOrder"});
    }
        
    function handleStartNewOrder() {
        dispatch({type:"startNewOrder"})
    }
        
    useEffect(() => {
        isConfirming ? document.body.classList.add('confirmedState') :
        document.body.classList.contains('confirmedState') &&
        document.body.classList.remove('confirmedState')
    }, [isConfirming]);
        
    const globalState = {
        state,
        handleBuyProduct,
        handleQuantityDecreament,
        handleQuantityIncreament,
        handleRemoveProduct,
        handleStartNewOrder,
        handledConfirmOrder
    }
    return (
        <ProductsContext.Provider value={globalState}>
            {children}
        </ProductsContext.Provider>
    );
} 

export { ProductsContext, ProductsProvider };