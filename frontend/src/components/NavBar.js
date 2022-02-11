import { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { ReactComponent as BugTrackSVG } from '../assets/BugTrack.svg';
import { ReactComponent as BTSVG } from '../assets/BT.svg';
import { ReactComponent as ChevronDownSVG } from '../assets/ChevronDown.svg';

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {

  const location = useLocation();
  const history = useHistory();
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [title, setTitle] = useState('');
  const isUserOnDashboard = location.pathname.includes('/dashboard');

  const checkScrollDirection = () => {
    (window.scrollY > 0) ? setIsScrolledDown(true) : setIsScrolledDown(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScrollDirection, true);
    return () => {
      window.removeEventListener('scroll', checkScrollDirection, true);
    };
  }, []);

  const handleSelectProjectClick = () => {
    history.push('/dashboard');
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    if (location.pathname.includes('dashboard')) history.push('/login');
  };

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    const titleFromLocalStorage = localStorage.getItem('projectTitle');
    if (titleFromLocalStorage) setTitle(titleFromLocalStorage);
    else setTitle('');
  }, [location]);


  return (
    <nav className={`${isScrolledDown ? 'bg-red-700 shadow-lg text-white' : `${isUserOnDashboard ? 'lg:bg-gray-50' : 'bg-transparent'} text-red-700`} z-10 sticky top-0 h-16 pl-2 pr-3 transition`}>
      <div className="max-w-3xl mx-auto flex h-16 items-center justify-between">
        <NavLink to="/" onClick={() => window.scrollTo(window.top)} className={`${isScrolledDown ? 'fill-white' : 'fill-red-700'}`}>
          <BTSVG className=' lg:hidden transition w-16 h-16 fill-current' />
          <BugTrackSVG className='hidden lg:inline transition h-16 w-28 fill-current' />
        </NavLink>

        {isLoggedIn ?
          <>
            {(location.pathname.includes('dashboard') && title) && <button className='group flex items-center lg:space-x-2' onClick={handleSelectProjectClick}>
              <h3 className='lg:text-4xl'>{title}</h3>
              <ChevronDownSVG className="w-6 h-6 opacity-0 max-w-0 group-hover:max-w-full group-hover:opacity-100 transition" />
            </button>}
            <button className='underline-hover' onClick={handleLogout}>Log Out</button>
          </>
          : <>
            <NavLink to="/login" className="ml-auto mr-3 underline-hover" activeClassName="font-bold">Log In</NavLink>
            <NavLink to="/register" className='underline-hover' activeClassName="font-bold">Register</NavLink>
          </>
        }
      </div>
    </nav>
  );
}

export default NavBar;