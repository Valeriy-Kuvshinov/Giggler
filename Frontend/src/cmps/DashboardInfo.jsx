import { InfoDiv } from "./InfoDiv.jsx"

export function DashboardInfo({ dailyData, weeklyData, monthlyData }) {
    const latestHourProfit = dailyData.values?.[dailyData.values.length - 1] || 0
    const previousHourProfit = dailyData.values?.[dailyData.values.length - 2] || 0
    
    const latestDayProfit = weeklyData.values?.[weeklyData.values.length - 1] || 0
    const previousDayProfit = weeklyData.values?.[weeklyData.values.length - 2] || 0
    
    const latestWeekProfit = monthlyData.values?.[monthlyData.values.length - 7] || 0
    const previousWeekProfit = monthlyData.values?.[monthlyData.values.length - 14] || 0

    const getDifferenceDisplay = (current, previous) => {
        const difference = current - previous
        const sign = difference >= 0 ? '+' : '-'
        return `(${sign}$${Math.abs(difference).toFixed(2)})`
    }

    return (
        <section className="info-section">
            <div className="main-info-container grid">
                <InfoDiv 
                    title="This hour's profits" 
                    info={`$${latestHourProfit.toFixed(2)} ${getDifferenceDisplay(latestHourProfit, previousHourProfit)}`}
                />
                <InfoDiv 
                    title="This day's profits" 
                    info={`$${latestDayProfit.toFixed(2)} ${getDifferenceDisplay(latestDayProfit, previousDayProfit)}`}
                />
                <InfoDiv 
                    title="This week's profits" 
                    info={`$${latestWeekProfit.toFixed(2)} ${getDifferenceDisplay(latestWeekProfit, previousWeekProfit)}`}
                />
            </div>
        </section>
    )
}