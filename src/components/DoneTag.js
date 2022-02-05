import { ReactComponent as CheckSVG } from '../assets/check.svg';

const DoneTag = () => {
    return (
        <div className='btn ml-2 self-start bg-green-600 text-sm flex items-center p-1' >
            done <CheckSVG className="w-4 h-6" />
        </div>
    );
}

export default DoneTag;