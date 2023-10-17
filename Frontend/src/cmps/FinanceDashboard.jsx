import Typography from '@mui/material/Typography'
import { Line } from 'react-chartjs-2'
import { InfoDiv } from "./InfoDiv.jsx"

export function FinanceDashboard({ weeklyData, monthlyData, annualData }) {
    const latestDayProfit = weeklyData.values?.[weeklyData.values.length - 1] || 0
    const previousDayProfit = weeklyData.values?.[weeklyData.values.length - 2] || 0

    const latestWeekProfit = monthlyData.values?.[monthlyData.values.length - 7] || 0
    const previousWeekProfit = monthlyData.values?.[monthlyData.values.length - 14] || 0

    const latestMonthProfit = annualData.values?.[annualData.values.length - 1] || 0
    const previousMonthProfit = annualData.values?.[annualData.values.length - 2] || 0

    const getDifferenceDisplay = (current, previous) => {
        const difference = current - previous
        const sign = difference >= 0 ? '+' : '-'
        return `(${sign}$${Math.abs(difference).toFixed(2)})`
    }
    const lineChartOptions = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: function () {
                        return ''
                    },
                    label: function (context) {
                        return `$${context.raw.toFixed(2)}`
                    }
                }
            }
        }
    }
    return (
        <section className='dashboard-finances-container'>
            <h2>Site Finances:</h2>

            <section className="finance-info grid">
                <InfoDiv
                    title="This day's profits"
                    info={`$${latestDayProfit.toFixed(2)} ${getDifferenceDisplay(latestDayProfit, previousDayProfit)}`}
                />
                <InfoDiv
                    title="This week's profits"
                    info={`$${latestWeekProfit.toFixed(2)} ${getDifferenceDisplay(latestWeekProfit, previousWeekProfit)}`}
                />
                <InfoDiv
                    title="This month's profits"
                    info={`$${latestMonthProfit.toFixed(2)} ${getDifferenceDisplay(latestMonthProfit, previousMonthProfit)}`}
                />
            </section>

            <main className='grid finance-charts'>
                <div className="chart-section">
                    <Typography variant="h6">Weekly site profits</Typography>
                    <Line
                        data={{
                            labels: weeklyData.dates,
                            datasets: [{
                                data: weeklyData.values,
                                borderColor: '#404145',
                                color: '#222325',
                                fill: false,
                            }]
                        }}
                        options={lineChartOptions}
                    />
                </div>
                <div className="chart-section">
                    <Typography variant="h6">Monthly site profits</Typography>
                    <Line
                        data={{
                            labels: monthlyData.dates,
                            datasets: [{
                                data: monthlyData.values,
                                borderColor: '#404145',
                                color: '#222325',
                                fill: false,
                            }]
                        }}
                        options={lineChartOptions}
                    />
                </div>
                <div className="chart-section">
                    <Typography variant="h6">Annual site profits</Typography>
                    <Line
                        data={{
                            labels: annualData.dates,
                            datasets: [{
                                data: annualData.values,
                                borderColor: '#404145',
                                color: '#222325',
                                fill: false,
                            }]
                        }}
                        options={lineChartOptions}
                    />
                </div>
            </main>
        </section>
    )
}