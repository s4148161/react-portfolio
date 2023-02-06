import { format, isToday, isSameDay, intervalToDuration, parseISO, getMinutes, getYear, getMonth, getHours, getDate, set, isAfter } from 'date-fns';
import cx from 'classnames'
import styles from '../../styles/CalendarDay.module.css'
import { useAppContext } from '../../context/items-context'
import { useState, useEffect } from 'react';

const CalendarDay = ({ date, hoursInDay }) => {
    const { items, setItems, settings, setSettings } = useAppContext();

    

    const getTodaysEvents = () => {
        var events = {}

        const filterEvents = (obj) => {
            if (isSameDay(parseISO(obj.date), date)) {
                if (obj.hasOwnProperty("recurringDays")) {
                    if (obj.recurringDays!=="" && obj.recurringDays!==undefined) {
                        if (obj.recurringDays.includes(format(date, "EEEE")) && isAfter(date, parseISO(obj.date))) {
                            if (obj.hasOwnProperty('duration')) {
                                return true
                                
                            } else if (obj.hasOwnProperty('endTime')) {
                                if (isSameDay(parseISO(obj.date), parseISO(obj.endTime))) {
                                    console.log("ran")
                                    return true
                                } else {
                                    return false
                                }
                            } else {
                                return false
                            }
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                } else {
                    if (obj.hasOwnProperty('duration')) {
                        return true
                    } else if (obj.hasOwnProperty('endTime')) {
                        if (isSameDay(parseISO(obj.date), parseISO(obj.endTime))) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            } else {
                return false
            }
        }

        // events = items.filter(obj => obj.hasOwnProperty('duration') && (isSameDay(parseISO(obj.date), date) || obj.hasOwnProperty("recurringDays") && (obj.recurringDays.includes(format(date, "EEEE")) && isAfter(date, parseISO(obj.date)))))
        events = items.filter(obj => filterEvents(obj))
        
        return events
    }

    const [todaysEvents, setTodaysEvents] = useState(getTodaysEvents())

    

    useEffect(() => {
        setTodaysEvents(getTodaysEvents())
    }, [items, date]);

    /* const setHeight = (elmId) => {
        const elem = document.getElementById(elmId);
        const duration = todaysEvents.find(x => x.id === elmId).duration
        const startTime = new Date(date.setHours(5,0,0,0))
        const offset = intervalToDuration({
            start: startTime,
            end: parseISO(todaysEvents.find(x => x.id === elmId).date)
        })

        const offsetHours = offset.hours + (offset.minutes/60)
        
        const offsetPercent = offsetHours/hoursInDay*100
        const heightPercent = duration/hoursInDay*100
        if(typeof elem !== 'undefined' && elem !== null) {
            elem.style.height = heightPercent + "%";
            elem.style.top = offsetPercent + "%";
        }
    } */

    const createId = (elmId) => {
        const newId = elmId.concat(format(date, "EEEE"))
        return newId
    }

    const setSize = (elmId) => {
        const elem = document.getElementById(createId(elmId));
        const event = todaysEvents.find(x => x.id === elmId)
        

        

        const newDate = set(date, { year:getYear(date), month:getMonth(date), day:getDate(date), hours:getHours(parseISO(event.date)), minutes:getMinutes(parseISO(event.date))})

        const startHours = settings.calendarStart.slice(0,2)
        const startMinutes = settings.calendarStart.slice(-2)
        const startTime = new Date(date.setHours(parseInt(startHours),parseInt(startMinutes),0,0))
            
        const offset = intervalToDuration({
            start: startTime,
            end: newDate
        })

        const offsetHours = offset.hours + (offset.minutes/60)

        const offsetPercent = offsetHours/hoursInDay*100

        if (event.duration === undefined) {

            const endTime = set(date, { year:getYear(date), month:getMonth(date), day:getDate(date), hours:getHours(parseISO(event.endTime)), minutes:getMinutes(parseISO(event.endTime))})
            const endTimeDuration = intervalToDuration({
                start: newDate,
                end: endTime
            })

            const endTimeDurationHours = endTimeDuration.hours + (endTimeDuration.minutes/60)
            const heightPercent = endTimeDurationHours/hoursInDay*100

            if(typeof elem !== 'undefined' && elem !== null) {
                elem.style.height = heightPercent + "%";
            }
        } else {
            const duration = event.duration
            const heightPercent = duration/hoursInDay*100

            if(typeof elem !== 'undefined' && elem !== null) {
                elem.style.height = heightPercent + "%";
            }
        }

        if(typeof elem !== 'undefined' && elem !== null) {
            elem.style.top = offsetPercent + "%";
            if (event.color === 'red') {
                elem.style.backgroundColor = "#FECACA"
                elem.style.borderColor = "#F87171"
            } else if (event.color === 'blue') {
                elem.style.backgroundColor = "#BFDBFE"
                elem.style.borderColor = "#60A5FA"
            } else if (event.color === 'yellow') {
                elem.style.backgroundColor = "#FEF08A"
                elem.style.borderColor = "#FACC15"
            } else if (event.color === 'purple') {
                elem.style.backgroundColor = "#E9D5FF"
                elem.style.borderColor = "#C084FC"
            } else if (event.color === 'green') {
                elem.style.backgroundColor = "#BBF7D0"
                elem.style.borderColor = "#4ADE80"
            }
            if (elem.clientHeight < 50) {
                const children = elem.getElementsByTagName("p")
                if (children.length > 1) {
                    elem.removeChild(children[0])
                }
                if (elem.clientHeight < 13) {
                    if (children.length === 1) {
                        elem.removeChild(children[0])
                        const node = document.createElement("p");
                        const textnode = document.createTextNode("...");
                        node.style.marginTop = "-9%"
                        node.style.marginLeft = "10%"
                        document.getElementById(createId(elmId)).appendChild(node);
                        node.appendChild(textnode);
                        
                    }

                }
            }
        }


    }

    useEffect(() => {
        todaysEvents.map(({id}) => {
            setSize(id);
        })
    }, [todaysEvents]);

    const toggleSelected = (elmId) => {
        const _items = items.map((item) => {
            if(item.id === elmId) {
                item.selected = true
            }
            else {
                item.selected = false
            }
            return item
        })
        setItems(_items)
    }

    return (
        <div className="flex flex-col h-full px-1">
            <div className={cx("flex justify-between border-b-2 border-gray-400 pb-[12px] px-1 h-10", {[styles.today]: isToday(date)})}>
                <h2>{format((date), 'M.d')}</h2>
                <h2>{format((date), 'EEE')}</h2>
            </div>
            <div className='relative z-0'>
                {
                    todaysEvents.map(({id, title, date}) => (
                        <div key={id} id={createId(id)} className="absolute inset-0 z-10 border-l-4 border-green-400 opacity-100 shadow-md w-auto rounded-md bg-green-200 top-[3000px] h-[51px] cursor-pointer pointer-events-auto" onClick={() => toggleSelected(id)}>
                            <p className='text-sm mt-2 mx-3'>{format(parseISO(date), 'p')}</p>
                            <p className='text-sm font-bold mx-3 truncate'>{title}</p>
                        </div>
                    ))
                }
                {
                    [...Array(Math.ceil(hoursInDay/(settings.calendarIncrements/60)))].map((e, i) => (
                    <div key={i} className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                        <p className="py-2"></p>
                    </div>
                    ))
                }
                {/* <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div>
                <div className="box-border h-[42px] pr-[24px] relative border-b border-gray-300 block">
                    <p className="py-2"></p>
                </div> */}
            
            </div>
        </div>
    )
}

export default CalendarDay;