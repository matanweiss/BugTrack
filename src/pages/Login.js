import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {

  const mutation = useMutation(e => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/login', {
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

  const form = useRef();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGuestLogin = e => {
    setEmail('guest@user.com');
    setPassword('shalom');
    setTimeout(() => { mutation.mutate(e); }, 100);
  }

  useEffect(() => {

    const checkToken = () => {
      fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/verify', { credentials: 'include' })
      .then(res => { if (res.ok) history.push('/dashboard') });
    }
    
    checkToken();
  }, [history]);

  return (
    <div className='animate-fadeIn max-w-sm sm:max-w-md md:max-w-lg font-body px-4 mx-auto sm:border-2 border-red-200 rounded-md sm:px-12 my-8'>
      <form ref={form} onSubmit={mutation.mutate} className="flex flex-col min-h-[24rem] justify-evenly">
        <h4 className="mx-auto font-medium">Use your BugTrack account:</h4>
        <div className='relative'>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email address' className="peer placeholder-input" />
          <label className='placeholder-label'>Email address</label>
        </div>
        <div className='relative'>
          <input required minLength='6' value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' className="peer placeholder-input" />
          <label className='placeholder-label'>Password</label>
        </div>
        {mutation.isError && <p className='text-center text-red-600'>{mutation.error.message}</p>}
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-6">
          <button className="btn btn-hover">Login</button>
          <button type='button' onClick={handleGuestLogin} className='btn2 btn-hover hover:bg-white text-center'>Login as guest</button>
          <Link to='/forgot-password' className="m-auto self-center font-medium text-red-600 underline-hover">Forgot your password?</Link>
          <Link to='/register' className='m-auto text-sm font-medium text-red-600 underline-hover'>No account? Register here!</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;