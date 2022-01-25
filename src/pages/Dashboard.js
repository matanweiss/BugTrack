import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import DashboardMenu from "../components/DashboardMenu";
import Lists from "../components/Lists";

const Dashboard = () => {

  const history = useHistory();
  const menuContainer = useRef();
  const scrollXContainerRef = useRef();
  const [sideBarActiveItem, setSideBarActiveItem] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [needLeftArrow, setNeedLeftArrow] = useState(true);
  const [needRightArrow, setNeedRightArrow] = useState(true);

  const scrollBack = () => {
    scrollXContainerRef.current.scrollBy({
      left: -scrollXContainerRef.current.offsetWidth,
      behavior: "smooth"
    });
  }

  const scrollForward = () => {
    scrollXContainerRef.current.scrollBy({
      left: scrollXContainerRef.current.offsetWidth,
      behavior: "smooth"
    });
  }

  const checkIfNeedArrows = () => {
    if (!scrollXContainerRef.current) return null;
    const currentPage = Math.round(scrollXContainerRef.current.scrollLeft / scrollXContainerRef.current.offsetWidth) + 1;
    const numberOfPages = Math.round(scrollXContainerRef.current.scrollWidth / scrollXContainerRef.current.offsetWidth);
    (numberOfPages > currentPage) ? setNeedRightArrow(true) : setNeedRightArrow(false);
    (currentPage > 1) ? setNeedLeftArrow(true) : setNeedLeftArrow(false);
  }

  const listProps = {
    scrollXContainerRef, sideBarActiveItem, needLeftArrow, needRightArrow,
    setSideBarActiveItem, setIsMenuOpen, scrollBack, scrollForward, checkIfNeedArrows,
  }

  const dashboardMenuProps = {
    sideBarActiveItem, setSideBarActiveItem,
    setIsMenuOpen, checkIfNeedArrows
  }

  useEffect(() => {
    const checkToken = () => {
      fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/verify', { credentials: 'include' })
        .then(res => { if (!res.ok) history.push('/login') });
    }

    const initScrollListener = () => {
      let firstRun = true;
      scrollXContainerRef.current.addEventListener('scroll', () => {
        if (firstRun) {
          firstRun = false;
          setTimeout(() => { checkIfNeedArrows(); }, 500);
          setTimeout(() => { firstRun = true; }, 1000);
        }
      });
    }

    checkToken();
    initScrollListener();
  }, [history]);

  const handleMenuOpen = () => {
    if (isMenuOpen) {
      setTimeout(() => { setIsMenuOpen(!isMenuOpen); }, 150);
      menuContainer.current.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(0.95)' }], { duration: 149 });
    }
    else setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="font-body flex flex-col h-[calc(100vh-4rem)] lg:bg-gray-50">

      <div className='lg:flex lg:pt-2 lg:animate-fadeIn lg:pr-28 lg:max-w-6xl lg:mx-auto lg:space-x-8 lg:max-h-[calc(100vh-8rem)] h-auto min-h-0 h-full flex-shrink'>
        <span className='hidden lg:inline'> <DashboardMenu props={dashboardMenuProps} /></span>
        <Lists props={listProps} />
      </div>

      {/* mobile buttons*/}
      <div className='lg:hidden fixed bottom-0 inset-x-0 z-10 bg-white'>
        {isMenuOpen && (
          <div ref={menuContainer} id='mobile' className='absolute animate-fadeIn -top-36 w-screen'>
            <DashboardMenu props={dashboardMenuProps} />
          </div>
        )}
        <div className="flex h-16 fill-current text-red-600">
          <svg className={`w-6 h-6 m-auto ${!needLeftArrow && 'opacity-0'}`} onClick={scrollBack}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          <svg className="w-7 h-7 m-auto cursor-pointer" onClick={handleMenuOpen}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          <svg className={`w-6 h-6 m-auto ${!needRightArrow && 'opacity-0'}`} onClick={scrollForward}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>
      </div>
      <div className="min-h-[4rem] hidden lg:block"></div>
    </div>

  );
}

export default Dashboard;