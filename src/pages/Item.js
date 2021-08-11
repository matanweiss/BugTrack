import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { editItem, getItem, removeItem } from "../firebase";

const Item = ({ props }) => {

  const container = useRef();
  const history = useHistory();
  const { list, id } = useParams();
  const [item, setItem] = useState({});
  const [isBug, setIsBug] = useState(item.bug);
  const [isFeature, setIsFeature] = useState(item.feature);
  const [titleInput, setTitleInput] = useState(item.title);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [reloadItem, setReloadItem] = useState(false);

  useEffect(() => {
    getItem(props.selectedProject, list, id).then(item => {
      setItem(item);
      setIsBug(item.bug);
      setIsFeature(item.feature);
      setTitleInput(item.title);
      if (item.description) setDescriptionInput(item.description);
      setIsLoading(false);
    }).catch(err => {
      console.error(err.message);
      history.push('/dashboard');
    });
  }, [reloadItem, id, list, history, props.selectedProject])

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const editedItem = {
      id, title: titleInput, bug: isBug, feature: isFeature, createdAt: item.createdAt
    }
    if (descriptionInput) editedItem.description = descriptionInput;
    editItem(props.selectedProject, list, editedItem).then(() => {
      setReloadItem(!reloadItem);
      setIsEditing(false);
    });
  }

  const handleDelete = () => {
    setIsLoading(true);
    removeItem(props.selectedProject, list, id).then(() => {
      props.setReloadLists(!props.reloadLists);
      history.push('/dashboard');
    });
  }

  const handleMouseDown = e => {
    e.target.style.transform = 'scale(0.85)';
    setTimeout(() => { e.target.style.transform = 'scale(1)'; }, 200);
  }

  const resizeTextarea = e => {
    e.target.style.height = '3rem';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleModeSwitch = () => {
    container.current.animate([
      { opacity: 1, transform:'scale(1)' }, 
      { opacity: 0, transform:'scale(0.98)' }, 
      { opacity: 1, transform:'scale(1)' }], 
      { duration: 300 });
    setTimeout(() => { setIsEditing(!isEditing); }, 150);
  }

  const renderSpinner = () =>
    <div className='flex h-full w-full'>
      <svg className='animate-spin m-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  const renderEditMode = () =>
    <form onSubmit={handleSubmit}>
      <div className='text-right pb-2'>
        <label>
          <input className='opacity-0 absolute' type="checkbox" checked={isBug} onChange={e => setIsBug(e.target.checked)} />
          <span className={`btn text-sm p-2 md:p-1 ${isBug ? 'bg-red-600' : 'bg-red-400'}`}>bug</span>
        </label>
        <label>
          <input className='opacity-0 absolute' type="checkbox" checked={isFeature} onChange={e => setIsFeature(e.target.checked)} />
          <span className={`btn ml-2 text-sm p-2 md:p-1 ${isFeature ? 'bg-green-600' : 'bg-green-300'}`}>feature</span>
        </label>
      </div>
      <div className="relative w-full">
        <input className='peer placeholder-input md:border-gray-300 md:focus:border-gray-400'
          required placeholder='Title' value={titleInput} onChange={e => setTitleInput(e.target.value)}
        />
        <label className='placeholder-label md:text-gray-500 md:peer-placeholder-shown:text-gray-400'>Title</label>
      </div>

      <textarea className='text-gray-600 h-12 resize-none outline-none min-h-0 pt-6 w-full' rows='0' onKeyDown={resizeTextarea}
        placeholder='add description' value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)}
      >
      </textarea>

      <div className='hidden md:block shadow rounded-xl bg-white p-4 border-2 border-gray-200 absolute -right-36 top-0 self-start'>
        <button type='button' className='flex items-center' onClick={handleDelete}>
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          remove
        </button>
        <button className='flex items-center'>
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          save
        </button>
      </div>
    </form>

  const renderViewMode = () =>
    <>
      <div className="flex justify-end">
        {item.bug && (<div className='md:hidden btn ml-2 self-start text-sm p-1 hover:bg-red-600' >bug</div>)}
        {item.feature && (<div className='md:hidden btn mx-2 self-start bg-green-600 hover:bg-green-600 text-sm inline p-1' >feature</div>)}
      </div>

      <div className="flex md:pt-2 w-full">
        <h3 className=''>{item.title}</h3>
        {item.bug && (<div className='hidden md:block btn ml-2 self-start text-sm p-1 hover:bg-red-600' >bug</div>)}
        {item.feature && (<div className='hidden md:block btn mx-2 self-start bg-green-600 hover:bg-green-600 text-sm inline p-1' >feature</div>)}
      </div>
      <p className='pt-4 text-gray-400'>
        {item.description ? item.description : 'no description yet'}
      </p>
    </>

  return (
    <div className="font-body flex flex-col h-screen md:bg-gray-50">
      <NavBar title={props.selectedProject} setSelectedProject={props.setSelectedProject} />

      <div className="flex relative md:mx-auto pt-2 md:space-x-8 md:pr-28 animate-fadeIn">
        <div className='hidden md:block self-start rounded-xl bg-white p-4 border-2 shadow border-gray-200'>
          <button className="flex transition items-center" onClick={() => history.goBack()} onMouseDown={handleMouseDown}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <button className={`${isEditing && 'text-red-600'} flex transition items-center`} onClick={handleModeSwitch} onMouseDown={handleMouseDown} >
            <svg className='pointer-events-none w-6 h-6 scale-75' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            <span className='pointer-events-none'>Edit</span>
          </button>
        </div>

        <div ref={container} className="mx-4 md:px-6 w-full min-h-[7rem] md:border-2 md:shadow border-gray-200 bg-white pt-2 pb-4 md:w-[35rem] max-w-xl md:mx-auto relative md:rounded-xl">
          {isLoading
            ? renderSpinner()
            : isEditing ? renderEditMode() : renderViewMode()
          }
        </div >
      </div>

      <div className='md:hidden mt-auto'>
        <div className="flex h-16 fill-current text-red-600">
          {isEditing
            ? <>
              <svg onClick={handleDelete}
                className="animate-fadeIn w-6 h-6 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <svg onClick={handleSubmit}
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