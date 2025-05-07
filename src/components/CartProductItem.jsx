import { memo } from "react";

const CartProductItem = memo(function CartProductItem({ children }) {
    return (
        <>
            {children}
        </>
    );
});

export default CartProductItem;