import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";
// import SelectProject from "./SelectProject";
import DashboardMenu from "../components/DashboardMenu";
import Lists from "../components/Lists";

const Dashboard = () => {

  const scrollXContainerRef = useRef();
  // const [isProjectSelected, setIsProjectSelected] = useState(false);
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
    const offsetWidth = scrollXContainerRef.current.offsetWidth;
    const scrollWidth = scrollXContainerRef.current.scrollWidth;
    const scrollLeft = scrollXContainerRef.current.scrollLeft;
    const currentPage = Math.round(scrollLeft / offsetWidth) + 1;
    const numberOfPages = Math.round(scrollWidth / offsetWidth);


    if (numberOfPages > currentPage) setNeedRightArrow(true);
    else setNeedRightArrow(false);
    if (currentPage > 1) setNeedLeftArrow(true);
    else setNeedLeftArrow(false);
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
    checkIfNeedArrows();

    let firstRun = true;
    scrollXContainerRef.current.addEventListener('scroll', () => {
      if (firstRun) {
        firstRun = false;
        setTimeout(() => { checkIfNeedArrows(); }, 400);
        setTimeout(() => { firstRun = true; }, 1000);
      }
    });
  }, []);

  return (
    <>
      {/* <SelectProject setIsProjectSelected={setIsProjectSelected}
        isProjectSelected={isProjectSelected}
      /> */}
      <div className="font-body flex flex-col h-screen">
        <NavBar title={'Project Title'} />
        <div className="animate-fadeIn mx-4 md:px-4 min-h-0 flex md:shadow-xl md:w-full max-w-xl md:mx-auto relative md:rounded-xl">
          <Lists props={listProps} dashboardMenuProps={dashboardMenuProps} />
        </div>

        {/* mobile buttons*/}
        <div className='md:hidden mt-auto'>
          {isMenuOpen && (
            <div>
              <DashboardMenu props={dashboardMenuProps} />
            </div>
          )}
          <div className="flex h-16 fill-current text-red-600">
            <svg className={`w-6 h-6 m-auto ${needLeftArrow ? null : 'opacity-0'}`} onClick={scrollBack}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <svg className="w-7 h-7 m-auto cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            <svg className={`w-6 h-6 m-auto ${needRightArrow ? null : 'opacity-0'}`} onClick={scrollForward}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
        <div className="min-h-[4rem] hidden md:block"></div>
      </div>

    </>
  );
}

export default Dashboard;