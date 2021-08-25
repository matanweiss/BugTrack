import ItemPreview from "./ItemPreview";
import AddItem from "./AddItem";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import EmptyList from "./EmptyList";

const Lists = ({ props }) => {

  const [isAddingItem, setIsAddingItem] = useState(false);
  const checkIfNeedArrows = props.checkIfNeedArrows;
  const history = useHistory();
  const { projectId } = useParams();
  const { isLoading, data, refetch } = useQuery('lists', () =>
    fetch(`https://mw-bugtrack.herokuapp.com/get-lists/${projectId}`).then(res => res.json())
  );

  const deleteProjectMutation = useMutation(() =>
    fetch(`https://mw-bugtrack.herokuapp.com/delete-project/${projectId}`, { method: 'DELETE', }),
    { onSuccess: () => history.push('/dashboard') }
  );

  const deleteListMutation = useMutation(id =>
    fetch(`https://mw-bugtrack.herokuapp.com/delete-list/${id}`, { method: 'DELETE', }),
    { onSuccess: () => refetch() }
  );


  useEffect(() => {
    if (data) checkIfNeedArrows();
  }, [data, checkIfNeedArrows]);

  const filterList = (id, title, list) => {
    if (!list.length && props.sideBarActiveItem === 'all') return <EmptyList key={id} deleteListMutation={deleteListMutation} refetch={refetch} id={id} title={title} isAddingItem={isAddingItem} setIsAddingItem={setIsAddingItem} />
    const filteredList = list.filter(item => (props.sideBarActiveItem === 'bugs') ? item.bug : true)
      .filter(item => (props.sideBarActiveItem === 'features') ? item.feature : true)
      .filter(item => (props.sideBarActiveItem === 'settings') ? false : true);
    return filteredList.length ? showList(id, title, filteredList) : null
  }

  const showList = (id, title, list) =>
    <div key={id} className="overflow-y-auto w-full flex-shrink-0 "
      style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }} >
      <div className='min-h-full relative'>
        <h3 className='pt-4 pb-1 flex md:block items-center justify-between sticky top-0 bg-white text-center '>
          <span className='md:hidden opacity-0 w-6'>to center</span>
          {title}
          <svg onClick={() => deleteListMutation.mutate(id)} className="md:hidden text-red-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </h3>
        {list.map(item => <ItemPreview listId={id} item={item} key={item._id} />)}
        <AddItem setIsAddingItem={setIsAddingItem} isAddingItem={isAddingItem} listId={id} refetch={refetch} />
        <svg onClick={() => deleteListMutation.mutate(id)}
          className={`hidden ${!isAddingItem && 'md:inline'} hover:text-red-500 duration-300 cursor-pointer absolute right-0 text-red-400 bottom-4 w-6 h-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>

      </div>
    </div>

  const printLists = () => {
    const listsToPrint = data.lists.map(list => filterList(list._id, list.title, list.items));
    listsToPrint.push(<EmptyList key={projectId} refetch={refetch} projectId={projectId} />);
    return listsToPrint;
  }

  const renderSpinner = () =>
    <div className='flex h-full w-full'>
      <svg className='animate-spin m-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  return (
    <div className='flex md:w-[30rem] h-full bg-white border-gray-200 md:shadow px-4 md:relative md:border-2 md:rounded-xl md:overflow-hidden'>

      {props.needLeftArrow && <svg className="w-6 h-6 cursor-pointer absolute top-5 left-4 z-50 hidden md:inline text-gray-400" onClick={props.scrollBack}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      }
      <div className="animate-fadeIn  flex w-full overflow-x-auto" ref={props.scrollXContainerRef}
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >

        {(props.sideBarActiveItem === 'settings')
          ? (deleteProjectMutation.isLoading ? renderSpinner() :
            <div className='m-auto space-x-4 flex'>
              <p>delete project?</p>
              <button onClick={deleteProjectMutation.mutate} className='text-red-600'>yep</button>
            </div>)
          : isLoading || deleteListMutation.isLoading ? renderSpinner() : printLists()
        }

      </div>
      {props.needRightArrow &&
        <svg className="w-6 h-6 absolute top-5 right-4 hidden cursor-pointer md:block text-gray-400" onClick={props.scrollForward} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      }
    </div>
  );
}

export default Lists;