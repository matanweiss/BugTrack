import { useEffect } from "react";
import { Link } from "react-router-dom";
import phone from '../assets/phone.png';
import { ReactComponent as RealTimeSVG } from '../assets/real time.svg';
import { ReactComponent as CommentSVG } from '../assets/comment.svg';
import { ReactComponent as ProgressSVG } from '../assets/progress.svg';
import HomepageGridItem from "../components/HomepageGridItem";
import Container from "../components/Container";

const Home = () => {

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <Container>
        <div className="relative">
          <h1 className="font-medium tracking-wide">NOW LETS WRITE THIS PROJECT AGAIN</h1>
          <p>We built the best platform to keep track of your projects with your team</p>
          <img src={phone} className='hidden lg:inline absolute origin-top-right scale-50 -top-40 -right-36' alt="phone running the website" />
          <Link to='/login' className="btn-hover inline-block btn">GET STARTED</Link>
        </div>
        <h3 className="font-medium text-center tracking-wide text-red-600">BugTrack benefits</h3>
        <div className="space-y-8 grid gap-x-10 items-stretch lg:space-y-0 lg:grid-cols-3">
          <HomepageGridItem title="Real Time" svg={<RealTimeSVG />} description="Know the current state of each task as soon as your team updates" />
          <HomepageGridItem title="Comment" svg={<CommentSVG />} description="Write important notes for easy communication. no other platform needed!" />
          <HomepageGridItem title="Progress" svg={<ProgressSVG />} description="You won't forget any task! the old ones stay at the top so you can't ignore them" />
        </div>
      </Container>
      <div className="bg-red-600 text-white" style={{ height: '50vh' }}>
        <div className="max-w-3xl grid grid-cols-2 grid-rows-4 h-full lg:grid-cols-4 md:mx-auto">
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