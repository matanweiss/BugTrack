import ItemPreview from "./ItemPreview";
import AddItem from "./AddItem";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import EmptyList from "./EmptyList";

const Lists = ({ props }) => {

  const checkIfNeedArrows = props.checkIfNeedArrows;
  const history = useHistory();
  const { projectId } = useParams();
  const { isLoading, data, refetch } = useQuery('lists', () =>
    fetch(`http://localhost:5000/get-lists/${projectId}`).then(res => res.json())
  );

  const deleteProjectMutation = useMutation(() =>
    fetch(`http://localhost:5000/delete-project/${projectId}`, { method: 'DELETE', }),
    { onSuccess: () => history.push('/dashboard') }
  );

  useEffect(() => {
    if (data) checkIfNeedArrows();
  }, [data, checkIfNeedArrows]);

  const filterList = (id, title, list) => {
    if (!list.length && props.sideBarActiveItem === 'all') return <EmptyList refetch={refetch} id={id} title={title} />
    const filteredList = list.filter(item => (props.sideBarActiveItem === 'bugs') ? item.bug : true)
      .filter(item => (props.sideBarActiveItem === 'features') ? item.feature : true)
      .filter(item => (props.sideBarActiveItem === 'settings') ? false : true);
    return filteredList.length ? showList(id, title, filteredList) : null
  }

  const showList = (id, title, list) =>
    <div key={id} className="overflow-y-auto w-full flex-shrink-0 "
      style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }} >
      <h3 className='sticky top-0 bg-white pt-4 pb-1 text-center'>{title}</h3>
      {list.map(item => <ItemPreview listId={id} item={item} key={item._id} />)}
      <AddItem listId={id} refetch={refetch} />
    </div>

  const printLists = () => {
    if (data.lists.length) return data.lists.map(list => filterList(list._id, list.title, list.items));
    else return <EmptyList />;
  }


  const renderSpinner = () =>
    <div className='flex h-full w-full'>
      <svg className='animate-spin m-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  //if(data) if(!data.lists.length) console.log('need to add list');
  return (
    <div className='flex md:w-[30rem] h-full bg-white border-gray-200 md:shadow px-4 md:relative md:border-2 md:rounded-xl md:overflow-hidden'>

      {props.needLeftArrow && <svg className="w-6 h-6 absolute hidden md:inline text-gray-400" onClick={props.scrollBack}
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
          : isLoading ? renderSpinner() : printLists()
        }
        
      </div>
      {props.needRightArrow && <svg className="w-6 h-6 absolute hidden md:block text-gray-400" onClick={props.scrollForward}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      }
    </div>
  );
}

export default Lists;