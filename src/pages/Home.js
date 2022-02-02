import { useEffect } from "react";
import { Link } from "react-router-dom";
import phone from '../assets/phone.png';
import { ReactComponent as RealTimeSVG } from '../assets/real time.svg';
import { ReactComponent as CommentSVG } from '../assets/comment.svg';

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
          <div className="flex flex-col items-center space-y-4 border-2 border-red-300 p-4 rounded-lg">
            <h3>Real Time</h3>
            <RealTimeSVG />
            <p className="">Know the current state of each task as soon as your team updates</p>
          </div>
          <div className="flex flex-col items-center space-y-4 border-2 border-red-300 p-4 rounded-lg">
            <h3>Comment</h3>
            <CommentSVG />
            <p className="">Write important notes for easy communication.<br />no other platform needed!</p>
          </div>
          <div className="flex flex-col items-center space-y-4 border-2 border-red-300 p-4 rounded-lg">
            <h3>Progress</h3>
            <svg className="h-24" viewBox="0 0 71.27 64.92"><defs><linearGradient id="lukaszadam_gradient" x1="51.72" y1="34.73" x2="63.31" y2="34.73" gradientUnits="userSpaceOnUse"><stop offset=".04" stopColor="#f27b40" /><stop offset="1" stopColor="#ec697d" /></linearGradient><linearGradient id="lukaszadam_gradient-2" x1="33.89" y1="42.97" x2="45.46" y2="42.97" xlinkHref="#lukaszadam_gradient" /><linearGradient id="lukaszadam_gradient-3" x1="15.72" y1="50.55" x2="27.36" y2="50.55" xlinkHref="#lukaszadam_gradient" /><style>{`.cls-12,.cls-17{fill:none;strokeMiterlimit:10}.cls-12{stroke:#732e54;stroke-width:2px}.cls-17{stroke-linecap:round}.cls-10{fill:#fff}.cls-15{fill:#cec1bc;fill-rule:evenodd}.cls-17{stroke:#fff}`}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M53.75 11.86L33.68 24.91a2.64 2.64 0 11-2.88-4.43l20.07-13a2.64 2.64 0 012.88 4.43z" opacity=".8" fill="#389bf3" /><path d="M26.93 29.3L13.51 38a2.64 2.64 0 11-2.88-4.43l13.42-8.72a2.64 2.64 0 012.88 4.43z" fill="#ff9d23" opacity=".8" /><path d="M44.32 8.79L24.26 21.84a2.64 2.64 0 11-2.88-4.43l20.06-13a2.64 2.64 0 112.88 4.43z" fill="#aa7dff" /><path d="M17.5 26.23L4.08 35a2.64 2.64 0 01-2.88-4.48l13.42-8.72a2.64 2.64 0 112.88 4.43z" fill="#389bf3" /><path d="M50.38 4.86l-.13.08A2.64 2.64 0 0147.37.51l.13-.08a2.64 2.64 0 012.88 4.43z" fill="#ff9d23" /><path d="M52.73 21.72L32.66 34.77a2.65 2.65 0 01-2.88-4.44l20.07-13a2.64 2.64 0 012.88 4.43z" opacity=".5" fill="#389bf3" /><path d="M25.91 39.16l-13.42 8.72a2.64 2.64 0 11-2.88-4.43L23 34.72a2.65 2.65 0 012.88 4.44z" opacity=".5" fill="#aa7dff" /><path d="M58.78 17.79l-.12.08a2.65 2.65 0 01-2.88-4.44l.12-.08a2.65 2.65 0 112.88 4.44z" opacity=".5" fill="#ff9d23" /><path strokeLinecap="round" stroke="#732e54" strokeWidth="2" fill="none" strokeMiterlimit="10" d="M16.97 59.71l38.56-17.82" /><path className="cls-10" d="M33.86 21.16h11.57v38.38H33.86z" /><path fill="url(#lukaszadam_gradient)" d="M51.72 6.25h11.59V63.2H51.72z" /><path className="cls-12" d="M51.01 6.97H63.9v56.95H51.01z" /><path fill="url(#lukaszadam_gradient-2)" d="M33.89 22.97h11.57v40H33.89z" /><path className="cls-12" d="M33.15 22.06h12.89v41.86H33.15z" /><path fill="url(#lukaszadam_gradient-3)" d="M15.72 37.4h11.64v26.3H15.72z" /><path className="cls-12" d="M15.3 37.61h12.89v26.3H15.3z" /><circle className="cls-10" cx="63.4" cy="7.85" r="6.3" /><path className="cls-15" d="M69.89 8.06a6.3 6.3 0 11-12.59 0 5.81 5.81 0 01.22-1.62 6.3 6.3 0 0012.17 0 6.66 6.66 0 01.2 1.62z" /><circle className="cls-12" cx="63.97" cy="8.43" r="6.3" /><circle className="cls-10" cx="16.1" cy="37.23" r="6.3" /><path className="cls-15" d="M22.6 37.44a6.3 6.3 0 01-12.6 0 5.42 5.42 0 01.23-1.62 6.29 6.29 0 0012.16 0 6.15 6.15 0 01.21 1.62z" /><circle className="cls-12" cx="16.68" cy="37.8" r="6.3" /><path opacity=".3" stroke="#fff" strokeLinecap="round" fill="none" strokeMiterlimit="10" d="M58.74 60.4h.97" /><path className="cls-17" d="M54.44 54.35v6.05h2.19" /><path opacity=".6" stroke="#fff" strokeLinecap="round" fill="none" strokeMiterlimit="10" d="M54.44 49.95v1.16" /><path className="cls-17" d="M54.44 43.6v3.21" /></g></g></svg>
            <p>You won't forget any task! the old ones stay at the top so you can't ignore them</p>
          </div>
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