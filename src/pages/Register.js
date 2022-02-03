import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import InputEmail from "../components/InputEmail";
import InputPassword from "../components/InputPassword";

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
    <div className="animate-fadeIn max-w-sm sm:max-w-md md:max-w-lg  px-4 mx-auto sm:border-2 border-red-200 rounded-md sm:px-12 my-8">
      <form onSubmit={mutation.mutate} className="flex flex-col min-h-[22rem] justify-evenly">
        <h4 className='text-center font-medium'>Create your BugTrack account:</h4>
        <div className="space-y-6">
          <InputEmail email={email} setEmail={setEmail} />
          <InputPassword password={password} setPassword={setPassword} />
        </div>
        {mutation.isError && <p className='text-center text-red-600 font-medium'>{mutation.error.message}</p>}
        <button className='btn btn-hover'>Register</button>
        <Link to='/login' className='mx-auto text-sm font-medium text-red-600 underline-hover'>Have an account? Log in here</Link>
      </form>
    </div>
  );
}

export default Register;