import { useEffect, useState } from "react";

const Item = ({ SelectedItem, setSelectedItem }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isBug, setIsBug] = useState(SelectedItem[0].bug);
  const [isFeature, setIsFeature] = useState(SelectedItem[0].feature);
  const [titleInput, setTitleInput] = useState(SelectedItem[0].title);
  const [descriptionInput, setDescriptionInput] = useState('');

  const handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'isBug') setIsBug(value);
    if (name === 'isFeature') setIsFeature(value);
    if (name === 'titleInput') setTitleInput(value);
    if (name === 'descriptionInput') setDescriptionInput(value);
  }

  return (
    <div className='animate-fadeIn py-8 items-start flex w-full flex-col'>
      {isEditing
        ?
        <>
          <div className="flex flex-col md:flex-row items-center w-full">
            <svg className="mr-2 hidden md:inline w-6 h-6" onClick={() => setSelectedItem([])}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <input value={titleInput} onChange={handleInputChange} name='titleInput'
              className='text-2xl w-full md:w-auto p-1 focus:border-red-500 transition rounded-md outline-none border-2 border-red-300' />
            <div className='md:hidden py-4 w-full'>
              <textarea name="descriptionInput" placeholder='add description' value={descriptionInput} onChange={handleInputChange}
                className='resize-none h-full p-2 w-full focus:border-red-500 transition mb-4 rounded-md outline-none border-2 border-red-300'>
              </textarea>
            </div>
            <div className='md:self-start mt-4 md:mt-0'>
              <label>
                <input className='opacity-0 absolute' type="checkbox" name='isBug' checked={isBug} onChange={handleInputChange} />
                <span className={`btn ml-2 text-sm p-2 md:p-1 ${isBug ? 'bg-red-600' : 'bg-red-400'}`}>bug</span>
              </label>
              <label>
                <input className='opacity-0 absolute' type="checkbox" name='isFeature' checked={isFeature} onChange={handleInputChange} />
                <span className={`btn mx-2 text-sm p-2 md:p-1 ${isFeature ? 'bg-green-600' : 'bg-green-300'}`}>feature</span>
              </label>
            </div>
            <svg className="hidden md:inline ml-auto w-7 h-7" onClick={() => setIsEditing(!isEditing)}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>          </div>
          <div className='hidden md:block pl-8 pr-12 py-4 w-full'>
            <textarea name="descriptionInput" placeholder='add description' value={descriptionInput} onChange={handleInputChange}
              className='resize-none h-full p-2 w-full focus:border-red-500 transition mb-4 rounded-md outline-none border-2 border-red-300'>
            </textarea>
          </div>
          <button className='flex items center mt-8 md:mt-4 block m-auto btn btn-hover'>
            <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            save
          </button>
        </>
        :
        <>
          <div className="flex items-center w-full">
            <svg className="mr-2 hidden md:inline w-6 h-6" onClick={() => setSelectedItem([])}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <h2>{SelectedItem[0].title}</h2>
            {SelectedItem[0].bug && (<div className='btn ml-2 self-start text-sm p-1 hover:bg-red-600' >bug</div>)}
            {SelectedItem[0].feature && (<div className='btn mx-2 self-start bg-green-600 hover:bg-green-600 text-sm inline p-1' >feature</div>)}
            <svg className="hidden md:inline ml-auto w-6 h-6" onClick={() => setIsEditing(!isEditing)}
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </div>
          <p className='pt-4 md:p-4 md:ml-4 text-gray-400'>no description yet</p>
        </>
      }
    </div >
  );
}

export default Item;