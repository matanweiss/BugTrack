import { ReactComponent as DocumentsSVG } from '../assets/documents.svg';
import { ReactComponent as CheckSVG } from '../assets/check.svg';
import { ReactComponent as BugSVG } from '../assets/bug.svg';
import { ReactComponent as SettingsSVG } from '../assets/settings.svg';

const DashboardMenu = (props) => {

  const handleClick = (item, e) => {
    props.setSideBarActiveItem(item);
    setTimeout(() => { props.checkIfNeedArrows(''); }, 400);
    if (e.target.parentElement.parentElement.id === 'mobile') {
      e.target.parentElement.parentElement.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(0.95)' }], { duration: 149 });
      setTimeout(() => { props.setIsMenuOpen(false); }, 150);
    }
  }

  const handleMouseDown = e => {
    e.target.style.transform = 'scale(0.85)';
    setTimeout(() => { e.target.style.transform = 'scale(1)'; }, 200);
  }

  return (
    <div className="relative bg-white self-start flex flex-col pb-2 items-start 
      p-4 space-y-2 lg:rounded-xl lg:border-2 lg:shadow border-gray-200 lg:mr-auto"
    >
      <button
        onClick={e => { handleClick('all', e) }} onMouseDown={handleMouseDown}
        className={`${(props.sideBarActiveItem === 'all') ? 'text-red-600' : null} origin-left transition flex`}>
        <DocumentsSVG className="w-6 h-6 pointer-events-none" />
        All
      </button>
      <button onClick={e => { handleClick('features', e) }} onMouseDown={handleMouseDown}
        className={`${(props.sideBarActiveItem === 'features') ? 'text-red-600' : null} origin-left flex transition`}>
        <CheckSVG className="w-6 h-6 pointer-events-none" />
        Done
      </button>
      <button onClick={e => { handleClick('bugs', e) }} onMouseDown={handleMouseDown}
        className={`${(props.sideBarActiveItem === 'bugs') ? 'text-red-600' : null} origin-left flex transition`}>
        <BugSVG className="w-6 h-6 pointer-events-none" />
        Bugs
      </button>
      <button onClick={e => { handleClick('settings', e) }} onMouseDown={handleMouseDown}
        className={`${(props.sideBarActiveItem === 'settings') ? 'text-red-600' : null} origin-left flex transition`}>
        <SettingsSVG className="w-6 h-6 pointer-events-none" />
        Settings
      </button>
    </div>
  );
}

export default DashboardMenu;