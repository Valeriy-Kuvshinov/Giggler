import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend
} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend)
import { FinanceDashboard } from '../cmps/FinanceDashboard.jsx'
import { GigDashboard } from '../cmps/GigDashboard.jsx'

export function DashboardPage() {
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

    return (
        <main className="dashboard-page flex column">
            <div className='dashboard-container-header flex column'>
                <h1>Welcome dear admin!</h1>
                <h2>Here is our most updated business statistics:</h2>
            </div>

            <GigDashboard />

            <section className='dashboard-container'>
                <h2>General Users Info:</h2>
            </section>

            <FinanceDashboard weeklyData={data.weekly} monthlyData={data.monthly} annualData={data.annual} />
        </main>
    )
}