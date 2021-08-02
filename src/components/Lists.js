import { motion } from "framer-motion";
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
    <motion.div key={title} layout className="overflow-y-auto w-full flex-shrink-0 "
      style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }} ref={scrollYContainerRef} >
      <motion.h3 {...props.fadeVariants} layout='position' className='sticky top-0 bg-white pt-4 pb-1 text-center'>{title}</motion.h3>
      {list.map(item => <ItemPreview item={item} key={item.id} setIsItemSelected={props.setSelectedItem} />)}
      <AddItem listTitle={title}/>
    </motion.div>


  const printLists = () => {
    let arr = [];
    for (const [key, value] of Object.entries(lists)) arr.push(filterList(key, value))
    setTimeout(() => { props.checkIfNeedArrows(); }, 400);
    return arr;
  }

  useEffect(() => {
    getLists('project 1').then(lists => setLists(lists));
  }, [])

  return (
    <div className={`${props.SelectedItem.length ? 'hidden' : ''} w-full flex`}>
      <motion.div {...props.fadeVariants} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="sticky top-0 hidden md:block">
        <DashboardMenu props={dashboardMenuProps} />
      </motion.div>
      {props.needLeftArrow && <svg className="w-6 h-6 absolute hidden md:inline top-1/2 -translate-y-1/2 left-[7.6rem] text-gray-400" onClick={props.scrollBack}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      }
      <div className="flex pb-4 w-full overflow-x-auto" ref={props.scrollXContainerRef}
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        {printLists()}
      </div>
      {props.needRightArrow && <svg className="w-6 h-6 absolute hidden md:block top-1/2 -translate-y-1/2 right-1.5 text-gray-400" onClick={props.scrollForward}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      }
    </div>
  );
}

export default Lists;