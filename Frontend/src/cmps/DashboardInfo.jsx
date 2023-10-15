import { InfoDiv } from "./InfoDiv.jsx"

export function DashboardInfo({ dailyData, weeklyData, monthlyData }) {
    const todayProfits = dailyData.values?.reduce((acc, val) => acc + val, 0) || 0
    const weeklyProfits = weeklyData.values?.reduce((acc, val) => acc + val, 0) || 0
    const monthlyProfits = monthlyData.values?.reduce((acc, val) => acc + val, 0) || 0

    return (
        <section className="info-section">
            <div className="main-info-container grid">
                <InfoDiv title="Today's profits" info={`$${todayProfits.toFixed(2)}`} />
                <InfoDiv title="This week's profits" info={`$${weeklyProfits.toFixed(2)}`} />
                <InfoDiv title="This month's profits" info={`$${monthlyProfits.toFixed(2)}`} />
            </div>
        </section>
    )
}