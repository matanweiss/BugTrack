import { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

const NavBar = ({ title, setSelectedProject }) => {

  const history = useHistory();
  const location = useLocation()
  const [scrolledDown, setScrolledDown] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setScrolledDown(true);
    } else {
      setScrolledDown(false);
    }
  }, { passive: true });

  const handleSelectProjectClick = () => {
    setSelectedProject('');
    if(location.pathname !== '/dashboard')
    history.push('/dashboard');
  } 

  return (
    <nav className={`${scrolledDown ? 'bg-red-700 shadow-lg text-white' : `${location.pathname.includes('/dashboard') ? 'md:bg-gray-50' : 'bg-transparent'} text-red-700`} z-10 sticky top-0 h-16 font-body pl-2 pr-3  transition`}>
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <NavLink to="/">
          <svg className={`${scrolledDown ? 'text-white' : 'text-red-700'} md:hidden transition w-16 h-16 fill-current`} onClick={() => window.scrollTo(window.top)} version="1.0" xmlns="http://www.w3.org/2000/svg" width="121.333" height="61.333" viewBox="0 0 91 46"><path d="M75.6 9.1C70.7 11.7 57.2 13 56 11c-1.3-2-4.2-.3-3.8 2.2.3 2.2.8 2.3 8.1 2.3 4.2-.1 7.7.1 7.7.2 0 1.4-12.5 18.5-13.8 19-4.1 1.6-5.9 8.3-2.3 8.3 2.8 0 4.3-1.8 13.7-16.2 4.6-7.1 9.2-13.1 10.1-13.4 7.4-2.4 9.4-4.4 5.7-5.8-2-.8-1.3-.9-5.8 1.5zM27.6 9.4c-5.4 2-9 4.9-9.4 7.5-.3 1.7.2 2.1 2.2 2.1 1.5 0 2.5-.5 2.4-1.2-.4-1.9 7-5.1 12.7-5.5 6-.5 8.5.8 6.9 3.4-1.5 2.5-8.3 7.1-11.7 7.9l-2.8.6 3.1-4.8c2.7-4.3 2.9-4.9 1.3-5.3-1-.2-2.6.8-3.9 2.4C25.1 20.6 14 39.4 14 40.8c0 1.8 3.7 1.5 4.4-.4.5-1.4.8-1.4 2.8 0 4.8 3.4 16.8.6 20.3-4.8 2.4-3.6 1.2-7.4-2.7-9-3-1.3-3-1.4-.9-2.1 1.2-.4 3.8-2 5.7-3.7 4-3.5 4.5-7.5 1.4-10.3-2.7-2.5-12.1-3-17.4-1.1zm10.3 21.1c3 2.9-7.7 8.9-12.5 7.1-.8-.3-1.2-1-.9-1.6.3-.5-.1-1-.9-1-.9 0-1.6-.3-1.6-.8 0-1.8 3.2-5.1 5.3-5.5 3.3-.6 9 .4 10.6 1.8z" /></svg>
          <svg className={`${scrolledDown ? 'text-white' : 'text-red-700'}  hidden md:inline transition w-28 fill-current`} onClick={() => window.scrollTo(window.top)} version="1.0" width="236" height="77.333" viewBox="0 0 177 58"><path d="M106 8.1c-4.4 2.7-18.7 4-20.1 1.8-.7-1.2-1.1-1.1-2.5.3-1.5 1.5-1.5 1.9-.3 3.4 1.1 1.3 2.7 1.6 8.6 1.2 8.3-.6 8.3-1.6 0 10.7-3 4.4-5.9 7.9-6.5 7.8-1.6-.4-5.5 5.5-4.8 7.2.9 2.3 4 1.8 6.7-1.3 1.4-1.5 5.2-6.9 8.4-12.1 7.1-11.4 10.1-15.1 12.4-15.1.9 0 2.7-.7 3.9-1.6 1.8-1.3 2.1-1.9 1.1-3-1.6-1.9-2.8-1.8-6.9.7zM19.6 8.4c-5.4 2-9 4.9-9.4 7.5-.3 1.7.2 2.1 2.2 2.1 1.4 0 2.5-.5 2.4-1.1-.8-3.7 16.3-7.9 19-4.7.9 1.1.8 1.9-.4 3.6-1.6 2.3-10.9 7.5-12.5 7-.5-.2.5-2.3 2.1-4.8 2.5-3.8 2.7-4.6 1.4-4.8-.9-.2-2.5.4-3.5 1.5C18.4 17.2 6 38 6 39.6c0 1.9 3.7 1.8 4.4-.2.5-1.4.8-1.4 2.8 0 7 5 23.2-2.6 21.4-9.9-.3-1.3-1.9-2.9-3.5-3.6l-2.9-1.3 4.3-2.7c6.7-4.2 8.3-8.9 4.5-12.4-2.7-2.5-12.1-3-17.4-1.1zm9.8 20.8c1.7.9 1.7 1.2-1.1 4-3.6 3.6-10.9 5.1-11.9 2.4-.3-.9-1.2-1.6-2-1.6-2.4 0 1.8-5.9 4.6-6.3 3.1-.5 7.9.2 10.4 1.5zM168.6 10.7c-1.3 2.1-4.9 8.4-8 13.9-6.1 11.1-9.4 13.8-15.9 13.2-4.9-.5-4.9-3.9.1-8.8 4.4-4.4 6.7-5.2 5.7-1.9-.5 1.6-.3 2 1 1.7 4.5-.8 4.4-6.8 0-6.8-5.2 0-13.5 6.7-13.5 10.9 0 2-3 5.1-4.8 5.1-1.8 0-1.5-1.9 1.3-7.8 1.4-3 2.5-5.7 2.5-6.1 0-1.6-8.7-1-11.7.8-4.9 3-8.5 8.4-8.1 12.2.5 5 2.9 5.8 7.5 2.6 3.6-2.6 3.8-2.6 4.1-.8.4 2.8 3.8 3.6 6.7 1.7 2.2-1.4 2.6-1.4 5.3.1 2.6 1.5 3.3 1.5 7.5.1 2.6-.8 4.7-1.1 4.7-.7 0 2.1 3.1.6 4.5-2.1l1.6-3.1 3.3 3.6c1.8 1.9 4 3.5 4.9 3.5 2.1 0 7.7-4.8 7.7-6.6 0-2-1.4-1.7-3.5.6-2.4 2.6-4.7 2.5-6.4-.2-1.2-2-1.1-2.3 1.5-4.2 4-2.9 7.4-6.6 7.4-8.2 0-3-2.2-2.2-6.5 2.2-2.5 2.6-4.8 4.5-5.1 4.2-.3-.4 1.2-3.7 3.4-7.5 7.1-12.1 8.4-15.3 6.7-15.3-.8 0-2.5 1.7-3.9 3.7zM132 26.9c0 1.2-10 11.1-11.1 11.1-1.3 0-1.1-.9 1.2-4.6 3.1-5.1 9.9-9.5 9.9-6.5z" /><path d="M51.1 23.2c-.6.7-3.3 4.1-6.1 7.5-4.6 5.7-7 7.6-7 5.5 0-.4 1.4-3.3 3.1-6.5 1.7-3.2 2.8-6.1 2.5-6.4-1.3-1.3-3.4.9-6.5 6.6-5.4 10.1-2.9 15.4 4.3 9.1l3.6-3.2v2.5c0 2.7 3 4.5 5.2 3.1.7-.4 2.7-.7 4.6-.6 2.1.2 4.5-.5 6.5-2 2.8-2 3-2 1.8-.3-.8 1.1-3.4 4-5.8 6.5-5 5.3-6 9.3-2.5 9.8 1.2.2 2.2-.1 2.2-.6 0-1.9 9-11 14-14.2 2.7-1.8 5-3.8 5-4.6 0-2-1.2-1.7-5.5 1.1-2 1.5-3.9 2.4-4.1 2.2-.2-.1 1.9-3.8 4.6-8.1 2.8-4.2 5-7.9 5-8.1 0-.2-1.9-.4-4.2-.3-7.1.1-14.1 4.9-19.1 13C51 37.9 48 39 48 37c0-.6 1.4-3.7 3-7 1.7-3.3 3-6.4 3-7 0-1.4-1.7-1.3-2.9.2zm12.6 8.5c-3.7 3.6-7.1 6.3-7.4 5.9-1.2-1.1 5.1-8.8 8.7-10.7 6-3.3 5.7-2.1-1.3 4.8zM107.8 23.7c-2.8 3.3-9.7 15.7-9.2 16.5.7 1.1 3.4 1 3.4 0C102 39 113 27 114 27c.4 0 .6.9.3 2-.8 3.2 2.4 2.4 4.2-1 3.1-6 .4-8.1-5-3.8l-2.7 2.1.6-2.1c.9-2.7-1.4-3-3.6-.5z" /></svg>
        </NavLink>
        <button className={`${title ? 'flex' : 'hidden'} items-center md:space-x-2`} onClick={handleSelectProjectClick}>
          <h3 className='md:text-4xl'>{title}</h3>
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        {location.pathname.includes('/dashboard') ?
          <NavLink to='/' className=''>Sign Out</NavLink> :
          <>
            <NavLink className="ml-auto mr-3" to="/login" activeClassName="font-medium">Log In</NavLink>
            <NavLink to="/register" activeClassName="font-medium">Register</NavLink>
          </>
        }
      </div>
    </nav>
  );
}

export default NavBar;