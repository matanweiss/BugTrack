const SelectProject = ({ fadeVariants, isProjectSelected, setIsProjectSelected }) => {
  return (
    <>
      {!isProjectSelected && (
        <div
          style={{ backgroundColor: 'rgba(0, 0, 0, .4)', backgroundSize: '150% 150%' }}
          className="font-body w-screen h-screen z-50 absolute flex left-0 right-0 up-0 down-0">
          <div
            className="pt-4 shadow-xl rounded flex flex-col bg-white mx-4 my-auto sm:m-auto sm:w-2/3">
            <h1 className="text-center mb-4 text-red-600">Select your project:</h1>
            <button className="btn rounded-none" onClick={() => { setIsProjectSelected(true) }}>Project1</button>
            <button className="btn rounded-none" onClick={() => { setIsProjectSelected(true) }}>Project2</button>
            <button className="btn rounded-none" onClick={() => { setIsProjectSelected(true) }}>Project3</button>
            <button className="btn rounded-none" onClick={() => { setIsProjectSelected(true) }}>Project4</button>
            <button className="btn rounded-none rounded-b" onClick={() => { setIsProjectSelected(true) }}>Project5</button>
          </div>
        </div>)
      }
    </>
  );
}

export default SelectProject;