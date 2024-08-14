import React from 'react'

const HeatmapCalendar = ({ startDate, endDate, dataValues }) => {
    let startingDate = new Date(startDate)
    let endingDate = new Date(endDate)

    // Gives us the date difference (between ending date and starting date) in milliseconds - x 1000 = seconds, x 60 = minutes, x 60 = hours, x 24 = day, + 1 for including starting / ending date
    const daysInMonth = Math.ceil((endingDate - startingDate) / (1000 * 60 * 60 * 24)) + 1

    const calendarGrid = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(startingDate)
        date.setDate(startingDate.getDate() + i)
        return date.toISOString().slice(0, 10)
    })

    // dataValues?.reduce(...) -> meaning check if 'dataValues' is not 'null' or 'undefined' (if 'dataValues' is an array, call the 'reduce()' method on it, else if 'dataValues' is null or undefined, the entire expression returns 'undefined' and 'reduce' is not executed!)
    // instead of -Infinity, we can also place '0' BUT '0' may exist inside the count (so it's best to set the accumulator to be as low as possible so use -Infinity as the lowest number or value)
    const highestValue = dataValues?.reduce((a, b) => Math.max(a, b.count), -Infinity)

    const getIntensity = (activityCount) => {
        return highestValue !== 0 ? Number(activityCount / highestValue) : 0
    }

    const getColorFromIntensity = (intensity) => {
        // Light mode
        const colorCodes = ['#B9EBC1', '#9BE9A8', '#30C463', '#30A14E', '#278440', '#216E39'];
        // Dark mode
        // const colorCodes = ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'];
        const colorIndex = Math.min(Math.floor((intensity * colorCodes.length)), colorCodes.length - 1)
        return colorCodes[colorIndex]
    }

    return (
        <div className='grid grid-flow-col gap-[0.2rem] md:gap-1' style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr)' }}>
            {
                calendarGrid.map((day, index) => {
                    const activityCount = dataValues.find(itm => itm.date === day)?.count || 0
                    const intensity = getIntensity(activityCount)
                    const color = getColorFromIntensity(intensity)

                    return <div
                        className='w-3.5 h-3.5 md:w-4 md:h-4 rounded cursor-pointer'
                        key={index}
                        title={`${activityCount} Posts on ${day}`}
                        style={{ backgroundColor: `${activityCount == 0 ? "#E0E2E3" : String(color)}`, border: `${activityCount == 0 ? "1px solid #33333310" : String(color)}` }}
                    ></div>
                })
            }
        </div>
    )
}

export default HeatmapCalendar