const Item = ({ SelectedItem, setSelectedItem }) => {
  return (
    <div className='animate-fadeIn py-8 items-start flex w-full flex-col h-56'>
      <div className="flex items-center w-full">
        <svg className="mr-2 hidden md:inline w-6 h-6" onClick={() => setSelectedItem([])}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        <h2>{SelectedItem[0].title}</h2>
        {SelectedItem[0].bug && (<div className='btn ml-2 self-start text-sm p-1 hover:bg-red-600' >bug</div>)}
        {SelectedItem[0].feature && (<div className='btn mx-2 self-start bg-green-600 hover:bg-green-600 text-sm inline p-1' >feature</div>)}
        <svg className="hidden md:inline ml-auto w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
      </div>
      <p className='pt-4 md:p-4 md:ml-4 text-gray-400'>no description yet</p>
    </div>
  );
}

export default Item;