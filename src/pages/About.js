import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className='animate-fadeIn leading-10 h-56 max-w-xl flex flex-col font-body mx-4 md:mx-auto'>
      <h2 className='text-center font-medium my-8'>About</h2>
      <p className=''>The purpuse of building the website is learning fullstack development.</p>
      <p className=''>Please try both mobile & desktop, <Link className='text-red-600' to='contact'> let me know</Link> if you found a bug!</p>
      <p className=''>The frontend is built with
        <Link className='text-blue-600' target='_blank' to={{ pathname: 'https://reactjs.org/' }}> react </Link>
        and <Link className='text-blue-600' target='_blank' to={{ pathname: 'https://tailwindcss.com/' }}>tailwindcss</Link> for styling,
      </p>
      <p className=''>The backend is built with
        <Link className='text-green-600' target='_blank' to={{ pathname: 'https://nodejs.org/' }}> node </Link>
        and the database is stored at
        <Link className='text-green-600' target='_blank' to={{ pathname: 'https://www.mongodb.com/' }}> mongoDB</Link>. </p>
      <p className=''>You can view the code here! </p>
    </div>
  );
}

export default About;
