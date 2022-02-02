const HomepageGridItem = (props) => {
    return (
        <div className="flex flex-col items-center space-y-4 border-2 border-red-300 p-4 rounded-lg">
            <h3>{props.title}</h3>
            {props.svg}
            <p>{props.description}</p>
        </div>
    );
}

export default HomepageGridItem;