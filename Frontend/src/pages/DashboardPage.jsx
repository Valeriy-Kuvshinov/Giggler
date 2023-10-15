import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { gigService } from '../services/gig.service.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend)
import Typography from '@mui/material/Typography'
import { DashboardInfo } from '../cmps/DashboardInfo.jsx'

export function DashboardPage() {
    const [dailyData, setDailyData] = useState({})
    const [weeklyData, setWeeklyData] = useState({})
    const [monthlyData, setMonthlyData] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                // Daily data by the hour
                const dailyHours = [...Array(24)].map((_, i) => {
                    const d = new Date()
                    d.setHours(d.getHours() - i)
                    return `${d.getHours()}:00`
                }).reverse()
                const dailyValues = [...Array(24)].map(() => Math.floor(Math.random() * 1000))
                setDailyData({ dates: dailyHours, values: dailyValues })

                // Weekly data
                const weeklyDates = [...Array(7)].map((_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() - i)
                    return d.toISOString().split('T')[0]
                }).reverse()
                const weeklyValues = [...Array(7)].map(() => Math.floor(Math.random() * 10000))
                setWeeklyData({ dates: weeklyDates, values: weeklyValues })

                // Monthly data
                const monthlyDates = [...Array(30)].map((_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() - i)
                    return d.toISOString().split('T')[0]
                }).reverse()
                const monthlyValues = [...Array(30)].map(() => Math.floor(Math.random() * 10000))
                setMonthlyData({ dates: monthlyDates, values: monthlyValues })

            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
        return () => {
            ChartJS.unregister(ArcElement, CategoryScale, LineController, LineElement
                , PointElement, BarElement, LinearScale)
        }
    }, [])
    return (
        <main className="dashboard-page flex column">
            <div className='dashboard-container-header flex column'>
                <h1>Welcome dear admin!</h1>
                <h2>Here is our most updated business statistics:</h2>
            </div>
            <section className='dashboard-container'>
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
        </main>
    )
}