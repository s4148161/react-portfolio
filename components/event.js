import { ImBin } from 'react-icons/im';
import { useAppContext } from '../context/items-context'

const Event = (props) => {
    const { id, title, subject, description, category, grading, time, date, duration } = props;
    const { items, setItems } = useAppContext();
    const traits = {id:id,title:title,subject:subject,description:description,category:category,grading:grading,time:time,date:date,duration:duration}

    const listTraits = () => {
        let counter = 0
        const incrementCounter = () => {
            counter++
        }
        return (
            Object.entries(traits).map(([k, v], index) => [
                (v!==undefined&&k!=='id'&&k!=='title'&&k!=='subject'&&counter%2===0)&&
                <div key={index} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{v}</dd>
                </div>,
                (v!==undefined&&k!=='id'&&k!=='title'&&k!=='subject'&&counter%2===1)&&
                <div key={index} className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{v}</dd>
                </div>,
                (v!==undefined)&&incrementCounter()
            ])
        )
    }

    const handleDelete = (e, idToDelete) => {
        e.stopPropagation();
        const _items = items.filter((item) => item.id !== idToDelete)
        setItems(_items);
    };

    return (
        <details key={id} className='overflow-hidden bg-white shadow sm:rounded-lg mt-5 group'>
            <summary className="px-4 py-5 sm:px-6 list-none flex flex-wrap items-center cursor-pointer">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex flex-1">{title!==null&&title}{subject!==null&&subject}</h3>
                <button type="button" onClick={(e) => handleDelete(e, id)}>
                    <ImBin className='fill-gray-600' />
                </button>
            
            <div key={id} className='flex w-10 items-center justify-center'>
                <div className='border-8 border-transparent border-l-gray-600 ml-2 group-open:rotate-90 transition-transform origin-left'></div>
            </div>
            
            </summary>
            <div className='border-t border-gray-200'>
                <dl>
                    {
                        listTraits()
                    }
                </dl>
            </div>
        </details>
    )
}

export default Event;