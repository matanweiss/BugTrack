const Container = (props) => {
return ( 
    <div className="animate-fadeIn leading-7 md:max-w-3xl md:px-8 lg:px-0 px-4 sm:max-w-xl sm:mx-auto">
        {props.children}
    </div>
 );
}
 
export default Container;