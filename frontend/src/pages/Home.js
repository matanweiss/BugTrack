import { useEffect } from "react";
import { Link } from "react-router-dom";
import phone from '../assets/phone.png';
import { ReactComponent as RealTimeSVG } from '../assets/real time.svg';
import { ReactComponent as CommentSVG } from '../assets/comment.svg';
import { ReactComponent as ProgressSVG } from '../assets/progress.svg';
import HomepageGridItem from "../components/HomepageGridItem";
import Container from "../components/Container";
import githubLogoWhite from "../assets/githubLight.png"
import githubLogoDark from "../assets/githubDark.png"
const Home = () => {

  useEffect(() => {
    localStorage.removeItem('projectTitle');
  }, []);

  return (
    <>
      <Container>
        <div className="relative space-y-4 lg:pr-64">
          <h1 className="font-medium tracking-wide">TRACK EVERY ASPECT OF YOUR PROJECT</h1>
          <p>We built the best platform to keep track of your projects with your team</p>
          <img src={phone} className='hidden lg:inline absolute origin-top-right scale-50 -top-44 -right-36' alt="phone running the website" />
          <Link to='/login' className="btn-hover inline-block btn">GET STARTED</Link>
        </div>
        <div className="space-y-8">
          <h3 className="font-medium text-center tracking-wide text-red-600">BugTrack benefits</h3>
          <div className="space-y-8 grid gap-x-10 items-stretch lg:space-y-0 lg:grid-cols-3">
            <HomepageGridItem title="Real Time" svg={<RealTimeSVG />} description="Know the current state of each task as soon as your team updates" />
            <HomepageGridItem title="Comment" svg={<CommentSVG />} description="Write important notes for easy communication. no other platform needed!" />
            <HomepageGridItem title="Progress" svg={<ProgressSVG />} description="You won't forget any task! the old ones stay at the top so you can't ignore them" />
          </div>
        </div>
      </Container>
      <div className="lg:bg-red-600 lg:text-white text-red-600" style={{ height: '50vh' }}>
        <div className="max-w-3xl grid grid-cols-2 grid-rows-4 h-full lg:grid-cols-4 md:mx-auto">
          <h2 className="text-red-300 lg:text-red-900 hover:text-black transition cursor-default col-span-full row-span-2 lg:row-span-3 m-auto" >©MW</h2>
          <Link to='/about' className="underline-hover m-auto">About</Link>
          <Link to='/faq' className="underline-hover m-auto">FAQ</Link>
          <a className='m-auto' target='_blank' href="//github.com/matanweiss/BugTrack">
            <img className="lg:inline hidden h-12 w-12 hover:opacity-70" src={githubLogoWhite} alt="" />
            <img className=" lg:hidden h-12 w-12 hover:opacity-70" src={githubLogoDark} alt="" />
          </a>
          <Link to='/contact' className="underline-hover m-auto">Contact</Link>
        </div>
      </div>
    </>
  );
}

export default Home;