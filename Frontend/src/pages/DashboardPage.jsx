import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend
} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend)
import { gigService } from '../services/gig.service.js'
import { FinancePricingInfo } from '../cmps/FinancePricingInfo.jsx'

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
    }, [])
    return (
        <main className="dashboard-page flex column">
            <div className='dashboard-container-header flex column'>
                <h1>Welcome dear admin!</h1>
                <h2>Here is our most updated business statistics:</h2>
            </div>

            <section className='dashboard-container'>
                <h2>General Gigs Info:</h2>
            </section>

            <section className='dashboard-container'>
                <h2>General Users Info:</h2>
            </section>

            <FinancePricingInfo dailyData={dailyData} weeklyData={weeklyData} monthlyData={monthlyData} />
        </main>
    )
}