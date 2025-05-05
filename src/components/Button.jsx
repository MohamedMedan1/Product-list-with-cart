export default function Button({children,className,onClickHandler}) {
    return (
        <button className={className} onClick={onClickHandler}>
            {children}
        </button>
    );
}