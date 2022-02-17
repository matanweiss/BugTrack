import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import InputEmail from "../components/InputEmail";
import InputPassword from "../components/InputPassword";

const Register = ({ setIsLoggedIn }) => {

  const mutation = useMutation(e => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/register', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
  }, {
    onSuccess: user => user.json().then(user => {
      if (user.err) throw new Error(user.err);
      else {
        localStorage.setItem('jwt', user);
        setIsLoggedIn(true);
        history.push('/dashboard');
      }
    })
  });

  const mailRef = useRef();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    mailRef.current.focus();
  }, []);


  return (
    <FormContainer>
      <form onSubmit={mutation.mutate} className="flex flex-col min-h-[22rem] justify-evenly">
        <h4 className='text-center font-medium'>Create your BugTrack account:</h4>
        <div className="space-y-6">
          <InputEmail toRef={mailRef} email={email} setEmail={setEmail} />
          <InputPassword password={password} setPassword={setPassword} />
        </div>
        {mutation.isError && <p className='text-center text-red-600 font-medium'>{mutation.error.message}</p>}
        <button className='btn btn-hover'>Register</button>
        <Link to='/login' className='mx-auto text-sm font-medium text-red-600 underline-hover'>Have an account? Log in here</Link>
      </form>
    </FormContainer>
  );
}

export default Register;