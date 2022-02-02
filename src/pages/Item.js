import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import ItemEdit from "../components/ItemEdit";
import ItemView from "../components/ItemView";

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
    <div className=" flex flex-col h-[calc(100vh-4rem)] lg:bg-gray-50">

      <div className="flex relative lg:mx-auto pt-2 lg:space-x-8 lg:pr-28 animate-fadeIn">
        <div className='hidden lg:block self-start rounded-xl bg-white p-4 border-2 shadow border-gray-200'>
          <button className="flex transition items-center" onClick={() => history.goBack()} onMouseDown={handleMouseDown}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <button className={`${isEditing && 'text-red-600'} flex transition items-center`} onClick={handleModeSwitch} onMouseDown={handleMouseDown} >
            <svg className='pointer-events-none w-6 h-6 scale-75' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            <span className='pointer-events-none'>Edit</span>
          </button>
        </div>

        <div ref={container} className="mx-4 lg:px-6 w-full min-h-[7rem] lg:border-2 lg:shadow border-gray-200 bg-white pt-2 pb-4 lg:w-[35rem] lg:mx-auto relative lg:rounded-xl">
          {isEditing ? <ItemEdit props={editProps} /> : <ItemView />}
        </div >
      </div>

      <div className='lg:hidden mt-auto'>
        <div className="flex h-16 fill-current text-red-600">
          {isEditing
            ? <>
              <svg onClick={deleteMutation.mutate}
                className="animate-fadeIn w-6 h-6 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <svg onClick={e => editMutation.mutate(e)}
                className="animate-fadeIn w-6 h-6 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
            : <>
              <span className='w-6 h-6 m-auto opacity-0'></span>
              <svg className='animate-fadeIn w-6 h-6 m-auto' onClick={() => history.goBack()}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </>
          }
          <svg onClick={handleModeSwitch}
            className={`m-auto w-6 h-6 duration-300 ${isEditing && 'text-red-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      </div>


    </div>
  );
}

export default Item;