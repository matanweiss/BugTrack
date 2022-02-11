import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { ReactComponent as CheckSVG } from '../assets/check.svg';
import { ReactComponent as TrashIconSVG } from '../assets/TrashIcon.svg';
import BugTag from "./BugTag";
import DoneTag from "./DoneTag";

const ItemEdit = (props) => {

  const { itemId, listId } = useParams();
  const { data } = useQuery(['item', itemId], () =>
    fetch(process.env.REACT_APP_SERVER_BASE_URL + `/get-item/${listId}/${itemId}`).then(res => res.json())
  );

  const setIsBug = props.setIsBug;
  const setIsDone = props.setIsDone;
  const setTitleInput = props.setTitleInput;
  const setDescriptionInput = props.setDescriptionInput;

  const resizeTextarea = e => {
    e.target.style.height = '3rem';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleDoneCheck = e => {
    props.setIsDone(e.target.checked);
    props.setIsBug(false);
  }

  const handleBugCheck = e => {
    props.setIsBug(e.target.checked);
    props.setIsDone(false);
  }

  useEffect(() => {
    if (data) {
      setIsBug(data.bug);
      setIsDone(data.done);
      setTitleInput(data.title);
      if (data.description) setDescriptionInput(data.description);
    }
  }, [data, setIsBug, setIsDone, setTitleInput, setDescriptionInput]);

  if (props.editMutation.isLoading || props.deleteMutation.isLoading) return <Spinner />;

  return (
    <form onSubmit={props.editMutation.mutate}>

      {/* Bug & Done buttons */}
      <div className='space-x-2 flex justify-end'>
        <label>
          <input className='pointer-events-none opacity-0 absolute' type="checkbox" checked={props.isBug} onChange={e => handleBugCheck(e)} />
          <BugTag moreClassNames={`cursor-pointer h-8 flex items-center ${!props.isBug && 'bg-red-300 '}`} />
        </label>
        <label>
          <input className='pointer-events-none opacity-0 absolute' type="checkbox" checked={props.isDone} onChange={e => handleDoneCheck(e)} />
          <DoneTag moreClassNames={`cursor-pointer ${!props.isDone && 'bg-green-300 '}`} />
        </label>
      </div>

      {/* title */}
      <div className="relative w-full">
        <input className='peer placeholder-input lg:border-gray-300 lg:focus:border-gray-400'
          required placeholder='Title' value={props.titleInput} onChange={e => props.setTitleInput(e.target.value)}
        />
        <label className='placeholder-label lg:text-gray-500 lg:peer-placeholder-shown:text-gray-400'>Title</label>
      </div>

      {/* description */}
      <textarea className='text-gray-600 h-12 resize-none outline-none min-h-0 pt-6 w-full' rows='0' onKeyDown={resizeTextarea}
        placeholder='add description' value={props.descriptionInput} onChange={e => props.setDescriptionInput(e.target.value)}
      >
      </textarea>

      {/* Save & Remove buttons */}
      <div className='hidden lg:block shadow rounded-xl bg-white p-4 border-2 border-gray-200 absolute -right-36 top-0 self-start'>
        <button type='button' className='flex items-center' onClick={props.deleteMutation.mutate}>
          <TrashIconSVG className="w-4 h-6" />
          remove
        </button>
        <button className='flex items-center'>
          <CheckSVG className="w-4 h-6" />
          save
        </button>
      </div>
    </form>
  );
}

export default ItemEdit;