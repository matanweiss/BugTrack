import ItemEdit from "../components/ItemEdit";
import ItemView from "../components/ItemView";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { ReactComponent as ChevronLeftSVG } from '../assets/ChevronLeft.svg';
import { ReactComponent as PencilSVG } from '../assets/pencil.svg';
import { ReactComponent as TrashIconSVG } from '../assets/TrashIcon.svg';
import { ReactComponent as CheckSVG } from '../assets/check.svg';

const Item = () => {

  const { listId, itemId } = useParams();

  const editMutation = useMutation(e => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_SERVER_BASE_URL + `/edit-item/${listId}/${itemId}`, {
      method: 'post',
      body: JSON.stringify({ title: titleInput, bug: isBug, feature: isFeature, description: descriptionInput }),
      headers: { 'Content-Type': 'application/json' },
    })
  }, { onSuccess: () => setIsEditing(false) }
  );

  const deleteMutation = useMutation(() =>
    fetch(process.env.REACT_APP_SERVER_BASE_URL + `/delete-item/${listId}/${itemId}`, { method: 'DELETE', }),
    { onSuccess: () => history.goBack() }
  );

  const container = useRef();
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [isBug, setIsBug] = useState(false);
  const [isFeature, setIsFeature] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const editProps = {
    editMutation, deleteMutation, isBug, setIsBug, isFeature, setIsFeature,
    titleInput, setTitleInput, descriptionInput, setDescriptionInput, setIsEditing
  };
  const handleMouseDown = e => {
    e.target.style.transform = 'scale(0.85)';
    setTimeout(() => { e.target.style.transform = 'scale(1)'; }, 200);
  }


  const handleModeSwitch = () => {
    container.current.animate([
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(0.98)' },
      { opacity: 1, transform: 'scale(1)' }],
      { duration: 300 });
    setTimeout(() => { setIsEditing(!isEditing); }, 150);
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/verify', { credentials: 'include' })
      .then(res => { if (!res.ok) history.push('/login') });
  }, [history]);

  return (
    <div className="fixed inset-0 top-16 flex flex-col lg:bg-gray-50">

      {/* left menu */}
      <div className="flex relative lg:mx-auto pt-2 lg:space-x-8 lg:pr-28 animate-fadeIn">
        <div className='hidden lg:block self-start rounded-xl bg-white p-4 border-2 shadow border-gray-200'>
          <button className="flex transition items-center" onClick={() => history.goBack()} onMouseDown={handleMouseDown}>
            <ChevronLeftSVG />
            Back
          </button>
          <button className={`${isEditing && 'text-red-600'} flex transition items-center`} onClick={handleModeSwitch} onMouseDown={handleMouseDown} >
            <PencilSVG className='pointer-events-none w-6 h-6 scale-75' />
            <span className='pointer-events-none'>Edit</span>
          </button>
        </div>

        {/* item */}
        <div ref={container} className="mx-4 lg:px-6 w-full min-h-[7rem] lg:border-2 lg:shadow border-gray-200 bg-white pt-2 pb-4 lg:w-[35rem] lg:mx-auto relative lg:rounded-xl">
          {isEditing ? <ItemEdit props={editProps} /> : <ItemView />}
        </div >
      </div>

      {/* mobile bottom buttons */}
      <div className='lg:hidden mt-auto'>
        <div className="flex h-16 fill-current text-red-600">
          {isEditing
            ?
            <>
              <TrashIconSVG onClick={deleteMutation.mutate} className="animate-fadeIn w-6 h-6 m-auto" />
              <CheckSVG onClick={e => editMutation.mutate(e)} className="animate-fadeIn w-6 h-6 m-auto" />
            </>
            :
            <>
              <span className='w-6 h-6 m-auto opacity-0'></span>
              <ChevronLeftSVG onClick={() => history.goBack()} className='animate-fadeIn w-6 h-6 m-auto' />
            </>
          }
          <PencilSVG onClick={handleModeSwitch} className={`scale-85 m-auto w-6 h-6 duration-300 ${isEditing && 'text-red-800'}`} />
        </div>
      </div>

    </div>
  );
}

export default Item;