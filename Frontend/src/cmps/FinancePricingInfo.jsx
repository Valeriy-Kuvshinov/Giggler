import Typography from '@mui/material/Typography'
import { Line } from 'react-chartjs-2'
import { DashboardInfo } from './DashboardInfo'

export function FinancePricingInfo({ dailyData, weeklyData, monthlyData }) {
    return (
        <section className='dashboard-finances-container'>
            <h2>Finances & Pricing:</h2>
            <DashboardInfo dailyData={dailyData} weeklyData={weeklyData} monthlyData={monthlyData} />
            <div className="chart-section">
                <Typography variant="h6">Daily site revenue</Typography>
                <Line
                    data={{
                        labels: dailyData.dates,
                        datasets: [{
                            label: 'Profits in $',
                            data: dailyData.values,
                            borderColor: '#404145',
                            color: '#404145',
                            fill: false,
                        }]
                    }}
                />
            </div>
            <div className="chart-section">
                <Typography variant="h6">Weekly site revenue</Typography>
                <Line
                    data={{
                        labels: weeklyData.dates,
                        datasets: [{
                            label: 'Profits in $',
                            data: weeklyData.values,
                            borderColor: '#404145',
                            color: '#404145',
                            fill: false,
                        }]
                    }}
                />
            </div>
            <div className="chart-section">
                <Typography variant="h6">Monthly site revenue</Typography>
                <Line
                    data={{
                        labels: monthlyData.dates,
                        datasets: [{
                            label: 'Profits in $',
                            data: monthlyData.values,
                            borderColor: '#404145',
                            color: '#404145',
                            fill: false,
                        }]
                    }}
                />
            </div>
        </section>
    )
}