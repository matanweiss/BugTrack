import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const ForgotPassword = () => {
  return (
    <>
      <NavBar />
      <div className='animate-fadeIn h-56 max-w-xl flex font-body mx-4 md:mx-auto'>
        <h1 className='m-auto'>why dont you  
        <Link to='/dashboard' className='text-red-500 hover:text-red-600 transition'> Login as guest?</Link>

         </h1>
      </div>
    </>
  );
}

export default ForgotPassword;