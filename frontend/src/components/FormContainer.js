const FormContainer = (props) => {
    return (
        <div className='animate-fadeIn max-w-sm sm:max-w-md md:max-w-lg  px-4 mx-auto 
            sm:border-2 border-red-200 rounded-md sm:px-12 my-8'
        >
            {props.children}
        </div>
    );
}

export default FormContainer;