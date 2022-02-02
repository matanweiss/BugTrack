import { useEffect } from "react";
import { Link } from "react-router-dom";
import phone from '../assets/phone.png';
import { ReactComponent as RealTimeSVG } from '../assets/real time.svg';
import { ReactComponent as CommentSVG } from '../assets/comment.svg';
import { ReactComponent as ProgressSVG } from '../assets/progress.svg';
import HomepageGridItem from "../components/HomepageGridItem";

const Home = () => {

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div className="animate-fadeIn leading-7 md:max-w-3xl md:px-8 lg:px-0 px-4 sm:max-w-xl sm:mx-auto">
        <div className="mb-12 mt-8 relative lg:mt-36 lg:pr-56 lg:my-[25rem]">
          <h1 className="mb-2 font-medium tracking-wide">NOW LETS WRITE THIS PROJECT AGAIN</h1>
          <p>We built the best platform to keep track of your projects with your team</p>
          <img src={phone} className='hidden lg:inline absolute origin-top-right scale-50 -top-40 -right-36' alt="phone running the website" />
          <Link to='/login' className="btn-hover inline-block mt-6 btn">GET STARTED</Link>
        </div>
        <h3 className="mb-4 md:mb-10 mt-20 font-medium text-center tracking-wide text-red-600">BugTrack benefits</h3>
        <div className="space-y-8 mb-20 md:px-16 lg:px-0  grid gap-x-10 items-stretch lg:space-y-0 lg:grid-cols-3">
          <HomepageGridItem title="Real Time" svg={<RealTimeSVG />} description="Know the current state of each task as soon as your team updates" />
          <HomepageGridItem title="Comment" svg={<CommentSVG />} description="Write important notes for easy communication. no other platform needed!" />
          <HomepageGridItem title="Progress" svg={<ProgressSVG />} description="You won't forget any task! the old ones stay at the top so you can't ignore them" />
        </div>
      </div>
      <div className="bg-red-600  text-white" style={{ height: '50vh' }}>
        <div className="max-w-3xl mx-4 grid grid-cols-2  grid-rows-4 h-full lg:grid-cols-4 md:mx-auto">
          <h2 className="text-red-900 col-span-full row-span-2 lg:row-span-3 m-auto" >©MW</h2>
          <Link to='/about' className="underline-hover m-auto">About</Link>
          <Link to='/faq' className="underline-hover m-auto">FAQ</Link>
          <Link to='/terms-of-use' className="underline-hover m-auto">Terms of use</Link>
          <Link to='/contact' className="underline-hover m-auto">Contact</Link>
        </div>
      </div>

    </>
  );
}

export default Home;