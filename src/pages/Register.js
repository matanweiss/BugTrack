import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {

  const mutation = useMutation(e => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/register', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
  }, {
    onSuccess: user => user.json().then(user => {
      if (user.err) throw new Error(user.err);
      else {
        setIsLoggedIn(true);
        history.push('/dashboard');
      }
    })
  });

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="animate-fadeIn max-w-sm sm:max-w-md md:max-w-lg font-body px-4 mx-auto sm:border-2 border-red-200 rounded-md sm:px-12 my-8">
      <form onSubmit={mutation.mutate} className="flex flex-col min-h-[22rem] justify-evenly">
        <h4 className='text-center font-medium'>Enter your details:</h4>
        <div className='relative'>
          <input required type="email" onChange={e => setEmail(e.target.value)} placeholder='Email address' className="peer placeholder-input" />
          <label className='placeholder-label'>Email address</label>
        </div>
        <div className='relative'>
          <input required minLength='6' type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' className="peer placeholder-input" />
          <label className='placeholder-label'>Password</label>
        </div>
        {mutation.isError && <p className='text-center text-red-600 font-medium'>{mutation.error.message}</p>}
        <button className='btn btn-hover'>Register</button>
        <Link to='/login' className='mx-auto text-sm font-medium text-red-600 underline-hover'>Have an account? Log in here</Link>
      </form>
    </div>
  );
}

export default Register;