import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { editItem, getItem, removeItem } from "../firebase";

const Item = () => {

  const history = useHistory();
  const { list, id } = useParams();
  const [item, setItem] = useState({});
  const [isBug, setIsBug] = useState(item.bug);
  const [isFeature, setIsFeature] = useState(item.feature);
  const [titleInput, setTitleInput] = useState(item.title);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [needReload, setNeedReload] = useState(false);

  useEffect(() => {
    getItem('project 1', list, id).then(item => {
      if (item) {
        setItem(item);
        setIsBug(item.bug);
        setIsFeature(item.feature);
        setTitleInput(item.title);
        if (item.description) setDescriptionInput(item.description);
        setIsLoading(false);
      }
      else history.push('/dashboard');
    });
  }, [needReload, id, list])

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const editedItem = {
      id, title: titleInput, bug: isBug, feature: isFeature, createdAt: item.createdAt
    }
    if (descriptionInput) editedItem.description = descriptionInput;
    editItem('project 1', list, editedItem).then(() => {
      setNeedReload(!needReload);
      setIsEditing(false);
    });
  }

  const handleDelete = () => {
    setIsLoading(true);
    removeItem('project 1', list, id).then(() => {
      history.push('/dashboard');
    });
  }

  const renderSpinner = () =>
    <div className='flex h-full w-full'>
      <svg className='animate-spin m-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  const renderEditMode = () =>
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row items-center md:h-16 w-full">
        <svg className="mr-2 hidden md:inline w-6 h-6" onClick={() => history.goBack()}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <input required placeholder='Title' value={titleInput} onChange={e => setTitleInput(e.target.value)}
          className='text-2xl w-full md:w-auto p-1 focus:border-red-500 transition rounded-md outline-none border-2 border-red-300'
        />
        <div className='md:hidden py-4 w-full'>
          <textarea
            placeholder='add description' value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)}
            className='resize-none h-full p-2 w-full focus:border-red-500 transition mb-4 rounded-md outline-none border-2 border-red-300'>
          </textarea>
        </div>
        <div className='md:self-start mt-4 md:mt-0'>
          <label>
            <input className='opacity-0 absolute' type="checkbox" checked={isBug} onChange={e => setIsBug(e.target.checked)} />
            <span className={`btn ml-2 text-sm p-2 md:p-1 ${isBug ? 'bg-red-600' : 'bg-red-400'}`}>bug</span>
          </label>
          <label>
            <input className='opacity-0 absolute' type="checkbox" checked={isFeature} onChange={e => setIsFeature(e.target.checked)} />
            <span className={`btn mx-2 text-sm p-2 md:p-1 ${isFeature ? 'bg-green-600' : 'bg-green-300'}`}>feature</span>
          </label>
        </div>
        <svg className="hidden md:inline ml-auto w-7 h-7" onClick={() => setIsEditing(!isEditing)}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>          </div>
      <div className='hidden md:block pl-8 pr-12 py-4 w-full'>
        <textarea placeholder='add description' value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)}
          className='resize-none h-full p-2 w-full focus:border-red-500 transition mb-4 rounded-md outline-none border-2 border-red-300'>
        </textarea>
      </div>
      <div className='flex justify-evenly mt-auto md:mt-0'>
        <button type='button' className='flex items-center btn btn-hover' onClick={handleDelete}>
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          remove
        </button>
        <button className='flex items-center btn2 btn-hover'>
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          save
        </button>
      </div>
    </form>

  const renderViewMode = () =>
    <>
      <div className="flex items-center h-16 w-full">
        <svg className="mr-2 flex-shrink-0 hidden md:inline w-6 h-6" onClick={() => history.goBack()}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        <h2 className='truncate'>{item.title}</h2>
        {item.bug && (<div className='btn ml-2 self-start text-sm p-1 hover:bg-red-600' >bug</div>)}
        {item.feature && (<div className='btn mx-2 self-start bg-green-600 hover:bg-green-600 text-sm inline p-1' >feature</div>)}
        <svg className="hidden flex-shrink-0 md:inline ml-auto w-6 h-6" onClick={() => setIsEditing(!isEditing)}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
      </div>
      <p className='pt-4 md:p-4 md:ml-4 text-gray-400'>
        {item.description ? item.description : 'no description yet'}
      </p>
    </>

  return (
    <div className="font-body flex flex-col h-screen">
      <NavBar title={'Project Title'} />
      <div className="animate-fadeIn mx-4 md:px-4 min-h-0 md:shadow-xl md:w-full max-w-xl md:mx-auto relative md:rounded-xl">
        {isLoading
          ? renderSpinner()
          : isEditing ? renderEditMode() : renderViewMode()
        }
      </div >
      <div className='md:hidden mt-auto'>
        <div className="flex h-16 fill-current text-red-600">
          <span className='w-6 h-6 m-auto opacity-0'></span>
          <svg className='w-6 h-6 m-auto' onClick={() => history.goBack()}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <svg onClick={() => setIsEditing(!isEditing)}
            className="m-auto w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      </div>


    </div>
  );
}

export default Item;