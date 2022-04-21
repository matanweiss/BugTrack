import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import InputEmail from "../components/InputEmail";
import InputPassword from "../components/InputPassword";
import Spinner from "../components/Spinner";
import UseVerify from "../components/UseVerify";

const Login = (props) => {

  const mutation = useMutation(e => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
  }, {
    onSuccess: user => user.json().then(user => {
      if (user.err) throw new Error(user.err);
      else {
        localStorage.setItem('jwt', user);
        props.setIsLoggedIn(true);
        history.push('/dashboard');
      }
    })
  });

  const form = useRef();
  const mailRef = useRef();
  const history = useHistory();
  const [isRegularLoginClicked, setIsRegularLoginClicked] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGuestLogin = e => {
    setIsRegularLoginClicked(false);
    setEmail('guest@user.com');
    setPassword('shalom');
    setTimeout(() => { mutation.mutate(e); }, 100);
  }

  useEffect(() => {
    UseVerify(history, 'login');
    mailRef.current.focus();
  }, [history]);

  return (
    <FormContainer>
      <form ref={form} onSubmit={mutation.mutate} className="flex flex-col min-h-[22rem] justify-between pt-8 pb-6">
        <h4 className="mx-auto font-medium">Use your BugTrack account:</h4>
        <div className="space-y-6">
          <InputEmail toRef={mailRef} email={email} setEmail={setEmail} />
          <InputPassword password={password} setPassword={setPassword} />
        </div>
        {mutation.isError && <p className='text-center text-red-600'>{mutation.error.message}</p>}
        <div className="flex flex-wrap justify-between">
          <button className="btn btn-hover w-[48%]">
            {mutation.isLoading && isRegularLoginClicked ? <Spinner /> : 'Login'}
          </button>
          <button type='button' onClick={handleGuestLogin} className='w-[48%] btn2 btn-hover hover:bg-white text-center'>
            {mutation.isLoading && !isRegularLoginClicked ? <Spinner /> : 'Login as guest'}
          </button>
          <Link to='/register' className='mx-auto mt-6 text-sm font-medium text-red-600 underline-hover'>No account? Register here!</Link>
        </div>
      </form>
    </FormContainer>
  );
}

export default Login;