import { useEffect, useRef, useState } from "react";
import DashboardMenu from "./DashboardMenu";
import ItemPreview from "./ItemPreview";
import { getLists } from '../firebase';
import AddItem from "./AddItem";

const Lists = ({ props, dashboardMenuProps }) => {

  const [lists, setLists] = useState({});
  const scrollYContainerRef = useRef();
  


  const filterList = (title, list) => {
    const filteredList = list.filter(item => (props.sideBarActiveItem === 'bugs') ? item.bug : true)
      .filter(item => (props.sideBarActiveItem === 'features') ? item.feature : true)
      .filter(item => (props.sideBarActiveItem === 'settings') ? false : true);
    return filteredList.length ? showList(title, filteredList) : null
  }

  const showList = (title, list) =>
    <div key={title} className="overflow-y-auto w-full flex-shrink-0 " id={title}
      style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }} ref={scrollYContainerRef} >
      <h3 className='sticky top-0 bg-white pt-4 pb-1 text-center'>{title}</h3>
      {list.map(item => <ItemPreview setCurrentList={props.setCurrentList} item={item} key={item.id} setIsItemSelected={props.setSelectedItem} />)}
      <AddItem listTitle={title} setReloadTrigger={props.setReloadTrigger} reloadTrigger={props.reloadTrigger} />
    </div>


  const printLists = () => {
    let arr = [];
    for (const [key, value] of Object.entries(lists)) arr.push(filterList(key, value))
    setTimeout(() => { props.checkIfNeedArrows(); }, 400);
    return arr;
  }

  useEffect(() => {
    getLists('project 1').then(lists => {
      setLists(lists);
      props.setIsLoading(false);
      props.setSelectedItem([]);
      props.setIsEditing(false);
    });
  }, [props.reloadTrigger])

  return (
    <div className={`${props.SelectedItem.length ? 'hidden' : ''} w-full flex`}>
      <div className="sticky top-0 hidden md:block">
        <DashboardMenu props={dashboardMenuProps} />
      </div>
      {props.needLeftArrow && <svg className="w-6 h-6 absolute hidden md:inline top-1/2 -translate-y-1/2 left-[7.6rem] text-gray-400" onClick={props.scrollBack}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      }
      <div className="animate-fadeIn flex pb-4 w-full overflow-x-auto" ref={props.scrollXContainerRef}
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        {props.isLoading
          ?
          <div className='w-full h-24 md:h-full flex'>
            <div className='m-auto animate-spin'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
            </div>
          </div>
          : printLists()}
      </div>
      {props.needRightArrow && <svg className="w-6 h-6 absolute hidden md:block top-1/2 -translate-y-1/2 right-1.5 text-gray-400" onClick={props.scrollForward}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      }
    </div>
  );
}

export default Lists;