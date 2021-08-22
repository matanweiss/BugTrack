import { Link } from "react-router-dom";

const Login = () => {

  const handleLogin = e => {
    e.preventDefault();
  }

  return (
    <div className='animate-fadeIn max-w-lg font-body mx-4 sm:mx-auto border-2 border-red-200 rounded-md p-8 md:px-12 my-8'>
      <form onSubmit={handleLogin} className="flex flex-col">
        <h4 className="mx-auto font-medium mb-6">Please enter your login details:</h4>
        <div className='relative'>
          <input required type="email" placeholder='Email address' className="peer placeholder-input" />
          <label className='placeholder-label'>Email address</label>
        </div>
        <div className='relative mt-6 mb-8'>
          <input required type="password" placeholder='Password' className="peer placeholder-input" />
          <label className='placeholder-label'>Password</label>
        </div>
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-6">
          <button className="btn btn-hover">Login</button>
          <Link to='/dashboard' className='btn2 btn-hover hover:bg-white text-center'>Login as guest</Link>
          <Link to='/forgot-password' className="m-auto self-center font-medium text-red-600 underline-hover">Forgot your password?</Link>
          <Link to='/register' className='m-auto text-sm font-medium text-red-600 underline-hover'>No account? Register here!</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;