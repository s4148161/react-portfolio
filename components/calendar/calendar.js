import CalendarDay from "./calendarday";
import { startOfWeek, nextDay, previousDay, format, addMinutes, intervalToDuration, subMinutes, isWithinInterval } from 'date-fns'
import { useState } from 'react'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { AiTwotoneSetting } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import {  useAppContext } from '../../context/items-context.js';
import Link from "next/link";
import cx from 'classnames'
import styles from '../../styles/CalendarDay.module.css'

const Calendar = () => {
    const { items, setItems, settings } = useAppContext();
    const today = new Date();
    const [ weekStart, setWeekStart ] = useState(startOfWeek(today , { weekStartsOn: 1}))

    const startHours = settings.calendarStart.slice(0,2)
    const startMinutes = settings.calendarStart.slice(-2)
    const startTime = new Date(today.setHours(parseInt(startHours),parseInt(startMinutes),0,0))
    const endHours = settings.calendarEnd.slice(0,2)
    const endMinutes = settings.calendarEnd.slice(-2)
    const endTime = new Date(today.setHours(parseInt(endHours),parseInt(endMinutes),0,0))

    const durationInDay = intervalToDuration({
        start: startTime,
        end: endTime
    })

    const hoursInDay = durationInDay.hours + (durationInDay.minutes/60)

    const unselectAll = () => {
        const _items = items.map((item) => {
            item.selected = false
            return item
        })
        setItems(_items)
    }

    const resetToday = () => {
        setWeekStart(startOfWeek(today , { weekStartsOn: 1}))
        unselectAll()
    }

    const setNextWeek = () => {
        setWeekStart(nextDay((weekStart), 1))
        unselectAll()
    }

    const setPreviousWeek = () => {
        setWeekStart(previousDay((weekStart), 1))
        unselectAll()
    }

    const drawHour = (i) => {
        const now = new Date()
        const time = addMinutes(startTime, i*settings.calendarIncrements)
        var displayTime = ''
        const interval = {
            start: subMinutes(time, settings.calendarIncrements/2),
            end: addMinutes(time, settings.calendarIncrements/2)
        }
        
        if (isWithinInterval(now, interval)) {
            displayTime = now
        } else (
            displayTime = time
        )
        
        return (
            <div key={i} className={cx("box-border h-[42px] pr-[24px] relative block", {[styles.today]: isWithinInterval(now,interval)})}>
                <p className="py-2">{format(time, 'p').toLowerCase()}</p> {/* Change time to displayTime for actual time but wrong alignment*/}
            </div>
        )
    }

    return (
        <div className="px-12">
            <div className="flex justify-between">
                <div className="font-bold text-3xl text-gray-600">
                    {
                        format(weekStart, 'MMMM yyyy')
                    }
                </div>
                <div className="grid grid-rows-2">
                    <div>
                        <button className="mx-2 text-4xl" onClick={() => setPreviousWeek()}>
                            <BsFillArrowLeftCircleFill className="text-gray-600"/>
                        </button>
                        <button className="mx-2 text-4xl" onClick={() => setNextWeek()}>
                            <BsFillArrowRightCircleFill className="text-gray-600"/>
                        </button>
                    </div>
                    <button onClick={() => resetToday()}>Today</button>
                </div>
            </div>
            <div className="grid grid-cols-[10%_repeat(7,_minmax(0,_1fr))_1%]  mt-8 mb-16">
                <div className="flex flex-col h-full">
                    <div>
                        <div className="mt-[21px]"></div>
                        {
                            [...Array(Math.ceil((hoursInDay/(settings.calendarIncrements/60))+1))].map((e, i) => (
                                drawHour(i)
                            ))
                        }
                    </div>
                </div>
                <CalendarDay date={weekStart} hoursInDay={hoursInDay}/>
                <CalendarDay date={nextDay((weekStart), 2)} hoursInDay={hoursInDay}/>
                <CalendarDay date={nextDay((weekStart), 3)} hoursInDay={hoursInDay}/>
                <CalendarDay date={nextDay((weekStart), 4)} hoursInDay={hoursInDay}/>
                <CalendarDay date={nextDay((weekStart), 5)} hoursInDay={hoursInDay}/>
                <CalendarDay date={nextDay((weekStart), 6)} hoursInDay={hoursInDay}/>
                <CalendarDay date={nextDay((weekStart), 0)} hoursInDay={hoursInDay}/>
                <div className="px-2 my-12 justify-between pointer-events-auto">
                    <Link href="/preferences">
                        <AiTwotoneSetting className="text-2xl text-gray-600"/>
                    </Link>
                    <button>
                        <FaPlus className="text-2xl text-gray-600 my-2"/>
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default Calendar;

