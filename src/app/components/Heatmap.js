'use client'

import React, { useEffect, useState } from 'react'
import HeatmapCalendar from './HeatmapCalendar'

const Heatmap = () => {
    // activityData state - stores ALL objects fetch from useEffect
    const [activityData, setActivityData] = useState([])

    useEffect(() => {
        fetch('/api/user-activity')
            .then(res => res.json())
            .then(data => setActivityData(data.userActivity))
            .catch(err => console.error('There has been an error while fetching data', err))
    }, [])

    return (
        <div className='flex bg-white p-10 shadow-md rounded-xl w-96 min-w-96 md:min-w-[500px] lg:min-w-[700px] mb-8'>
            <span className='flex flex-col justify-between text-gray-400 text-xs pr-3'>
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </span>
            <HeatmapCalendar startDate={'2024-09-01'} endDate={'2024-12-13'} dataValues={activityData} />
        </div>
    )
}

export default Heatmap