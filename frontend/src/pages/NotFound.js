import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='animate-fadeIn relative h-56 max-w-xl flex flex-col  mx-4 text-center lg:mx-auto'>
      <div className='relative my-4'>
        <h1 className='text-6xl font-medium'>404</h1>
        <h1 className='absolute text-6xl inset-0 font-medium animate-ping'>404</h1>
      </div>
      <p className='mb-4'>Where did you try to go?😉 </p>
      <p>Get back <Link className='text-red-600' to='/'>home</Link>! </p>
    </div>
  );
}

export default NotFound;