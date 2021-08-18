import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="animate-fadeIn max-w-md font-body mx-4 sm:mx-auto border-2 border-red-200 rounded-md p-8 md:px-12 my-12">
      <form className="flex flex-col">
        <p className='text-center font-medium mb-8'>Whats yo info:</p>
        <div className='relative'>
          <input required type="email" placeholder='Email address' className="peer placeholder-input" />
          <label className='placeholder-label'>Email address</label>
        </div>
        <div className='relative mt-6 mb-8'>
          <input required type="password" placeholder='Password' className="peer placeholder-input" />
          <label className='placeholder-label'>Password</label>
        </div>
        <button className='btn btn-hover'>Register</button>
        <Link to='/login' className='m-auto mt-4 text-sm font-medium text-red-600 underline-hover'>Have an account? Log in here</Link>
      </form>
    </div>
  );
}

export default Register;