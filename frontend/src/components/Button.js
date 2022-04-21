const Button = (props) => {

    const handleClick = e => {
        props.action(e);
    }

    return (
        <button onClick={handleClick}
            className={
                `${props.isSecondary ? "border-2 border-red-600 text-red-600" : "bg-red-600 text-white hover:bg-red-500 "}
                p-2 rounded-md hover:shadow-lg transition-all ${props.classesToAdd}`
            }
        >
            {props.text}
        </button>
    );
}

export default Button;