import { ReactComponent as CheckSVG } from '../assets/check.svg';

const DoneTag = (props) => {
    return (
        <div className={'select-none btn self-start bg-green-600 text-sm flex items-center p-1 ' + props.moreClassNames} >
            done <CheckSVG className="w-4 h-6" />
        </div>
    );
}

export default DoneTag;