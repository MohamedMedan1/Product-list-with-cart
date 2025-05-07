import { useReducer, useEffect, createContext, useMemo} from "react";

const initalState =  {
    products: [],
    isConfirming: false,
    isLoading: false,
    error: "",
}

function reducer(state, action ) {
    switch (action.type) {
        case "productsLoading":
            return { ...state, isLoading: true };
        case "setProducts":
            return { ...state, products:action.payload};
        case "loadingFinished":
            return { ...state,isLoading:false};
        case "confirmOrder":
        return{...state,isConfirming:true};
        case "startNewOrder":
        return{products:state.products,isConfirming: false,isLoading: false,error: ""};
        default:
            return { ...state,error:action.payload};
    }
}

const ProductsContext = createContext();

function ProductsProvider({children}) {
    const [state, dispatch] = useReducer(reducer,initalState);
    const { isConfirming } = state;
    
    useEffect(() => {
        async function getProducts() {
        try {
            dispatch({ type: "productsLoading" });
                const res = await fetch("http://localhost:3000/items");
                const data = await res.json();
                if (data.length === 0) throw new Error("Something went wrong while request");
                dispatch({ type: "setProducts", payload: data }); 
            }
            catch (error){
                dispatch({type:"fetchingFailed",payload:error});
            }
            finally {
                dispatch({ type: "loadingFinished"});
            }
        }
        getProducts();
    }, []);
    
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
        document.body.classList.toggle("overflow-hidden",isConfirming);
    }, [isConfirming]);

    const globalState = useMemo(() => {
        return {
            state,
            handleStartNewOrder,
            handledConfirmOrder
        }
    },[state])
    
    return (
        <ProductsContext.Provider value={globalState}>
            {children}
        </ProductsContext.Provider>
    );
} 

export { ProductsContext, ProductsProvider };