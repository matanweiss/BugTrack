import AddItem from "./AddItem";

const EmptyList = ({ refetch, title, id }) => {

  if (title) return (
    <div key={id} className="overflow-y-auto text-center w-full flex-shrink-0 "
      style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }} >
      <h3 className='sticky top-0 bg-white pt-4 pb-2'>{title}</h3>
      <p>this list is empty, add an item!</p>
      <AddItem listId={id} refetch={refetch} />
    </div>
  )
  else return (
    <div className='w-full flex-shrink-0 py-8 md:pt-4'>
      <h3 className='text-center'>Add a new list!</h3>
      <form className='relative mt-4'>
        <input required placeholder='List Title' className="peer placeholder-input" />
        <label className='placeholder-label'>List Title</label>
      </form>
    </div>
  );
}

export default EmptyList;