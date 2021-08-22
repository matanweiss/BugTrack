import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemEdit = ({ setIsEditing }) => {

  const { listId, itemId } = useParams();
  const { data } = useQuery('item', () =>
    fetch(`http://localhost:5000/get-item/${itemId}`).then(res => res.json())
  );

  const editMutation = useMutation(e => {
    e.preventDefault();
    return fetch(`http://localhost:5000/edit-item/${listId}/${itemId}`, {
      method: 'post',
      body: JSON.stringify({ title: titleInput, bug: isBug, feature: isFeature, description: descriptionInput }),
      headers: { 'Content-Type': 'application/json' },
    })
  }, { onSuccess: () => setIsEditing(false) }
  );

  const deleteMutation = useMutation(() =>
    fetch(`http://localhost:5000/delete-item/${listId}/${itemId}`, { method: 'DELETE', }),
    { onSuccess: () => history.goBack() }
  );

  const history = useHistory();
  const [isBug, setIsBug] = useState(false);
  const [isFeature, setIsFeature] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const renderSpinner = () =>
    <div className='flex h-full w-full'>
      <svg className='animate-spin m-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  const resizeTextarea = e => {
    e.target.style.height = '3rem';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  useEffect(() => {
    if (data) {
      setIsBug(data.bug);
      setIsFeature(data.feature);
      setTitleInput(data.title);
      if (data.description) setDescriptionInput(data.description);
    }
  }, [data]);
  if (editMutation.isLoading || deleteMutation.isLoading) return renderSpinner();

  return (
    <form onSubmit={editMutation.mutate}>
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
        <button type='button' className='flex items-center' onClick={deleteMutation.mutate}>
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          remove
        </button>
        <button className='flex items-center'>
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          save
        </button>
      </div>
    </form>
  );
}

export default ItemEdit;