import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./NavBar";

const Login = () => {

  const history = useHistory();

  const handleLogin = e => {
    e.preventDefault();
    history.push("/dashboard");
  }

  return (
    <>
      <NavBar />
      <div className='animate-fadeIn max-w-md font-body mx-4 sm:mx-auto border-2 border-red-200 rounded-md p-8 sm:px-12 my-8'>
        <form onSubmit={handleLogin} className="flex flex-col">
          <h4 className="mx-auto font-medium mb-6">Please enter your login details:</h4>
          <label className="p-1">Email</label>
          <input type="email" className="p-1 focus:border-red-500 transition mb-4 rounded-md outline-none border-2 border-red-300" />
          <label className="p-1">Password</label>
          <input type="password" className="p-1 focus:border-red-500 transition mb-8 rounded-md outline-none border-2 border-red-300" />
          <div className="flex flex-col sm:flex-row-reverse justify-between sm:items-center">
            <button type="button" className="btn block mb-4 sm:m-0">Login</button>
            <Link to={'/forgot-password'} className="self-center font-medium text-red-400 after:border-red-300 after:border-b-2 after:block hover:text-red-500 after:transform after:transition after:scale-x-0 hover:after:scale-x-100 transition">Forgot your password?</Link>
          </div>
          <button className='btn2 mt-4 text-red-700'>Login as guest</button>
        </form>
      </div>
    </>
  );
}

export default Login;