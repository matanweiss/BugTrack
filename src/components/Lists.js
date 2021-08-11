import ItemPreview from "./ItemPreview";
import AddItem from "./AddItem";

const Lists = ({ props }) => {


  const filterList = (title, list) => {
    const filteredList = list.filter(item => (props.sideBarActiveItem === 'bugs') ? item.bug : true)
      .filter(item => (props.sideBarActiveItem === 'features') ? item.feature : true)
      .filter(item => (props.sideBarActiveItem === 'settings') ? false : true);
    return filteredList.length ? showList(title, filteredList) : null
  }

  const showList = (title, list) =>
    <div key={title} className="overflow-y-auto w-full flex-shrink-0 "
      style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }} >
      <h3 className='sticky top-0 bg-white pt-4 pb-1 text-center'>{title}</h3>
      {list.map(item => <ItemPreview listTitle={title} item={item} key={item.id} />)}
      <AddItem listTitle={title} setReloadLists={props.setReloadLists} reloadLists={props.reloadLists} />
    </div>


  const printLists = () => {
    let arr = [];
    for (const [key, value] of Object.entries(props.lists)) arr.push(filterList(key, value))
    setTimeout(() => { props.checkIfNeedArrows(); }, 400);
    return arr;
  }

  const renderSpinner = () =>
    <div className={`${props.selectedProject ? 'flex' : 'hidden'} h-full w-full`}>
      <svg className='animate-spin m-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  return (
    <div className='flex md:w-[30rem] h-full bg-white border-gray-200 md:shadow px-4 md:relative md:border-2 md:rounded-xl md:overflow-hidden'>

      {props.needLeftArrow && <svg className="w-6 h-6 absolute hidden md:inline top-1/2 -translate-y-1/2 left-0 text-gray-400" onClick={props.scrollBack}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      }
      <div className="animate-fadeIn  flex w-full overflow-x-auto" ref={props.scrollXContainerRef}
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        {props.isLoading ? renderSpinner() : props.selectedProject && printLists()}
      </div>
      {props.needRightArrow && <svg className="w-6 h-6 absolute hidden md:block top-1/2 -translate-y-1/2 right-1.5 text-gray-400" onClick={props.scrollForward}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      }
    </div>
  );
}

export default Lists;