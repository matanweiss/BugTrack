import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import DashboardMenu from "../components/DashboardMenu";
import Lists from "../components/Lists";
import { ReactComponent as ChevronRightSVG } from '../assets/ChevronRight.svg';
import { ReactComponent as MenuIconSVG } from '../assets/MenuIcon.svg';
import { ReactComponent as ChevronLeftSVG } from '../assets/ChevronLeft.svg';
import UseVerify from "../components/UseVerify";

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

  const scrollForward = page => {
    scrollXContainerRef.current.scrollBy({
      left: scrollXContainerRef.current.offsetWidth * page,
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
    setSideBarActiveItem, setIsMenuOpen, scrollBack, scrollForward, checkIfNeedArrows
  }

  const dashboardMenuProps = {
    sideBarActiveItem, setSideBarActiveItem,
    setIsMenuOpen, checkIfNeedArrows
  }

  useEffect(() => {

    const handleScroll = () => {
      if (firstRun) {
        firstRun = false;
        setTimeout(() => {
          checkIfNeedArrows();
          localStorage.setItem('pagesToScroll', Math.round(container.scrollLeft / 440));
          firstRun = true;
        }, 200);
      }
    }

    UseVerify(history, 'dashboard');
    const container = scrollXContainerRef.current;
    let firstRun = true;
    container.addEventListener('scroll', handleScroll, true);

    return () => {
      container.removeEventListener('scroll', handleScroll, true);
    }
  }, []);

  const handleMenuOpen = () => {
    if (isMenuOpen) {
      setTimeout(() => { setIsMenuOpen(!isMenuOpen); }, 150);
      menuContainer.current.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(0.95)' }], { duration: 149 });
    }
    else setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="fixed inset-0 top-16 flex flex-col lg:bg-gray-50">

      <div className='lg:flex lg:pt-2 lg:animate-fadeIn lg:pr-28 lg:max-w-6xl lg:mx-auto lg:space-x-8 lg:max-h-[calc(100vh-8rem)] h-auto min-h-0 flex-shrink'>
        <span className='hidden lg:inline'> <DashboardMenu {...dashboardMenuProps} /></span>
        <Lists {...listProps} />
      </div>

      {/* mobile bottom buttons*/}
      <div className='lg:hidden mt-auto bg-white'>
        {isMenuOpen && (
          <div ref={menuContainer} id='mobile' className='absolute animate-fadeIn -top-36 w-screen'>
            <DashboardMenu {...dashboardMenuProps} />
          </div>
        )}
        <div className="flex h-16 fill-current text-red-600">
          <ChevronLeftSVG className={`w-6 h-6 m-auto ${!needLeftArrow && 'opacity-0'}`} onClick={scrollBack} />
          <MenuIconSVG className="w-7 h-7 m-auto cursor-pointer" onClick={handleMenuOpen} />
          <ChevronRightSVG className={`w-6 h-6 m-auto ${!needRightArrow && 'opacity-0'}`} onClick={scrollForward} />
        </div>
      </div>
      <div className="min-h-[4rem] hidden lg:block"></div>

    </div>
  );
}

export default Dashboard;