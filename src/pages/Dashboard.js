import { useEffect, useRef, useState } from "react";
import DashboardMenu from "../components/DashboardMenu";
import Lists from "../components/Lists";

const Dashboard = () => {

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
    let firstRun = true;
    scrollXContainerRef.current.addEventListener('scroll', () => {
      if (firstRun) {
        firstRun = false;
        setTimeout(() => { checkIfNeedArrows(); }, 400);
        setTimeout(() => { firstRun = true; }, 1000);
      }
    });
  }, []);

  const handleMenuOpen = () => {
    if (isMenuOpen) {
      setTimeout(() => { setIsMenuOpen(!isMenuOpen); }, 150);
      menuContainer.current.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(0.95)' }], { duration: 149 });
    }
    else setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="font-body flex flex-col h-[calc(100vh-4rem)] md:bg-gray-50">
      <div className='hidden md:flex pt-2 animate-fadeIn max-w-6xl mx-auto md:pr-28 space-x-8 max-h-[calc(100vh-8rem)]'>
        <DashboardMenu props={dashboardMenuProps} />
        <Lists props={listProps} />
      </div>
      <div className="md:hidden min-h-0 h-full flex-shrink">
        <Lists props={listProps} />
      </div>

      {/* mobile buttons*/}
      <div className='md:hidden mt-auto relative'>
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
      <div className="min-h-[4rem] hidden md:block"></div>
    </div>

  );
}

export default Dashboard;