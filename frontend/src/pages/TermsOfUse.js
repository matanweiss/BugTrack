import { Link } from "react-router-dom";

const TermsOfUse = () => {
  return (
    <div className='animate-fadeIn h-56 max-w-xl flex flex-col  mx-4 text-center md:mx-auto'>
      <h2 className='font-medium my-8'>Terms Of Use</h2>
      <h2>Just look at the <Link to='' className='text-red-600'> website</Link>!</h2>
    </div>
  );
}

export default TermsOfUse;