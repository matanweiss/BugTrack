import { Link as a, Link } from "react-router-dom";

const About = () => {
  return (
    <div className='animate-fadeIn leading-10 h-56 max-w-xl flex flex-col  mx-4 lg:mx-auto'>
      <h2 className='text-center font-medium my-8'>About</h2>
      <p className=''>The purpuse of building the website is learning fullstack development.</p>
      <p className=''>Please try both mobile & desktop, <Link className='text-red-600' to='contact'> let me know</Link> if you found a bug!</p>
      <p className=''>The frontend is built with
        <a className='text-blue-600' target='_blank' href='//reactjs.org/' > react </a>
        and <a className='text-blue-600' target='_blank' href='//tailwindcss.com/'>tailwindcss</a> for styling,
      </p>
      <p className=''>The backend is built with
        <a className='text-green-600' target='_blank' href='//nodejs.org/'> node </a>
        and the database is stored at
        <a className='text-green-600' target='_blank' href='//mongodb.com/'> mongoDB</a>. </p>
      <p className=''>You can view the code
        <a className='text-red-600' target='_blank' href="//github.com/matanweiss/BugTrack"> here</a>
        !
      </p>
    </div>
  );
}

export default About;
