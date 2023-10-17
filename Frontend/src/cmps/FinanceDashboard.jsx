import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Line } from 'react-chartjs-2'
import { InfoDiv } from "./InfoDiv.jsx"
import { lineMoneyChartOptions } from '../services/chartService.js'

export function FinanceDashboard() {
    const [data, setData] = useState({
        weekly: {},
        monthly: {},
        annual: {}
    })

    const generateData = (length, dateModifier, maxValue, latestDateFormatter) => {
        const dates = [...Array(length)].map((_, i) => {
            const d = new Date()
            dateModifier(d, i)
            return i === 0 ? latestDateFormatter(d) : d.toISOString().split('T')[0]
        }).reverse()
        const values = [...Array(length)].map(() => Math.floor(Math.random() * maxValue))
        return { dates, values }
    }

    useEffect(() => {
        try {
            setData({
                weekly: generateData(7, (d, i) => d.setDate(d.getDate() - i), 1000, d => d.toISOString().split('T')[0]),
                monthly: generateData(30, (d, i) => d.setDate(d.getDate() - i), 10000, d => d.toISOString().split('T')[0]),
                annual: generateData(12, (d, i) => d.setMonth(d.getMonth() - i), 25000, d => d.toISOString().split('T')[0])
            })
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }, [])

    const latestDayProfit = data.weekly.values?.[data.weekly.values.length - 1] || 0
    const previousDayProfit = data.weekly.values?.[data.weekly.values.length - 2] || 0

    const latestWeekProfit = data.monthly.values?.[data.monthly.values.length - 7] || 0
    const previousWeekProfit = data.monthly.values?.[data.monthly.values.length - 14] || 0

    const latestMonthProfit = data.annual.values?.[data.annual.values.length - 1] || 0
    const previousMonthProfit = data.annual.values?.[data.annual.values.length - 2] || 0

    const getDifferenceDisplay = (current, previous) => {
        const difference = current - previous
        const sign = difference >= 0 ? '+' : '-'
        return `(${sign}$${Math.abs(difference).toFixed(2)})`
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
                            labels: data.weekly.dates,
                            datasets: [{
                                data: data.weekly.values,
                                borderColor: '#404145',
                                fill: true,
                                backgroundColor: 'rgba(145, 194, 245)'
                            }]
                        }}
                        options={lineMoneyChartOptions}
                    />
                </div>

                <div className="chart-section">
                    <Typography variant="h6">Monthly site profits</Typography>
                    <Line
                        data={{
                            labels: data.monthly.dates,
                            datasets: [{
                                data: data.monthly.values,
                                borderColor: '#404145',
                                fill: true,
                                backgroundColor: 'rgba(145, 194, 245)'
                            }]
                        }}
                        options={lineMoneyChartOptions}
                    />
                </div>

                <div className="chart-section">
                    <Typography variant="h6">Annual site profits</Typography>
                    <Line
                        data={{
                            labels: data.annual.dates,
                            datasets: [{
                                data: data.annual.values,
                                borderColor: '#404145',
                                fill: true,
                                backgroundColor: 'rgba(145, 194, 245)'
                            }]
                        }}
                        options={lineMoneyChartOptions}
                    />
                </div>
            </main>
        </section>
    )
}