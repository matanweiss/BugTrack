import ItemPreview from "./ItemPreview";
import AddItem from "./AddItem";
import Spinner from "./Spinner";
import EmptyList from "./EmptyList";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { ReactComponent as TrashIconSVG } from '../assets/TrashIcon.svg';
import { ReactComponent as ChevronRightSVG } from '../assets/ChevronRight.svg';
import { ReactComponent as ChevronLeftSVG } from '../assets/ChevronLeft.svg';

const Lists = (props) => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const checkIfNeedArrows = props.checkIfNeedArrows;
  const history = useHistory();
  const { projectId } = useParams();

  const { isLoading, data, refetch } = useQuery(['lists', projectId], () =>
    fetch(process.env.REACT_APP_SERVER_BASE_URL + `/get-lists/${projectId}`).then(res => res.json())
  );

  const deleteProjectMutation = useMutation(() =>
    fetch(process.env.REACT_APP_SERVER_BASE_URL + `/delete-project/${projectId}`, { method: 'DELETE', }),
    { onSuccess: () => history.push('/dashboard') }
  );

  const deleteListMutation = useMutation(id =>
    fetch(process.env.REACT_APP_SERVER_BASE_URL + `/delete-list/${id}`, { method: 'DELETE', }),
    {
      onSuccess: () => {
        checkIfNeedArrows();
        refetch();
      }
    }
  );


  useEffect(() => {
    if (data && !isScrolled) {
      setIsScrolled(true);
      props.scrollForward(localStorage.getItem('pagesToScroll'));
      setTimeout(() => { checkIfNeedArrows(); }, 200);
    }
    else checkIfNeedArrows();
  }, [data, checkIfNeedArrows]);




  const filterList = (id, title, list) => {
    if (!list.length && props.sideBarActiveItem === 'all') return <EmptyList key={id} deleteListMutation={deleteListMutation} refetch={refetch} id={id} title={title} isAddingItem={isAddingItem} setIsAddingItem={setIsAddingItem} />
    const filteredList = list.filter(item => (props.sideBarActiveItem === 'bugs') ? item.bug : true)
      .filter(item => (props.sideBarActiveItem === 'features') ? item.feature : true)
      .filter(item => (props.sideBarActiveItem === 'settings') ? false : true)
      .sort((a, b) => a.feature - b.feature); // move done items to end
    return filteredList.length ? showList(id, title, filteredList) : null
  }

  const showList = (id, title, list) =>
    <div key={id} className="overflow-y-scroll w-full flex-shrink-0 snap-center no-scrollbar">
      <div className='min-h-full relative'>
        <h3 className='lg:pt-4 pb-1 flex lg:block items-center justify-between sticky top-0 bg-white text-center '>
          <span className='lg:hidden opacity-0 w-6 select-none'>to center</span>
          {title}
          <TrashIconSVG className="lg:hidden text-red-400 w-6 h-6" onClick={() => deleteListMutation.mutate(id)} />
        </h3>
        {list.map(item => <ItemPreview listId={id} item={item} key={item._id} />)}
        <AddItem setIsAddingItem={setIsAddingItem} isAddingItem={isAddingItem} listId={id} refetch={refetch} />
        <TrashIconSVG onClick={() => deleteListMutation.mutate(id)} className={`hidden ${!isAddingItem && 'lg:inline'} hover:text-red-500 duration-300 cursor-pointer absolute right-0 text-red-400 bottom-4 w-6 h-6`} />
      </div>
    </div>

  const printLists = () => {
    const listsToPrint = data.lists.map(list => filterList(list._id, list.title, list.items));
    listsToPrint.push(<EmptyList key={projectId} refetch={refetch} projectId={projectId} />);
    return listsToPrint;
  }

  return (
    <div className='flex lg:w-[30rem] h-full bg-white border-gray-200 lg:shadow px-4 lg:relative lg:border-2 lg:rounded-xl lg:overflow-hidden'>

      {props.needLeftArrow &&
        <ChevronLeftSVG onClick={props.scrollBack} className="w-6 h-6 cursor-pointer absolute top-5 left-4 z-50 hidden lg:inline text-gray-400" />
      }

      <div className="no-scrollbar animate-fadeIn flex w-full overflow-x-auto snap-mandatory snap-x" ref={props.scrollXContainerRef}>

        {(props.sideBarActiveItem === 'settings')
          ?  // delete project
          (deleteProjectMutation.isLoading ? <Spinner /> :
            <div className='m-auto space-x-4 flex'>
              <p>delete project?</p>
              <button onClick={deleteProjectMutation.mutate} className='text-red-600'>yes</button>
            </div>)

          : // render lists
          isLoading || deleteListMutation.isLoading ? <Spinner /> : printLists()
        }

      </div>
      {props.needRightArrow &&
        <ChevronRightSVG onClick={() => props.scrollForward(1)} className="w-6 h-6 absolute top-5 right-4 hidden cursor-pointer lg:block text-gray-400" />
      }
    </div>
  );
}

export default Lists;