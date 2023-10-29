import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Line } from 'react-chartjs-2'

import { FinanceDashboardInfo } from "./FinanceDashboardInfo.jsx"
import { lineMoneyChartOptions } from '../../services/chartService.js'

import { orderBackendService } from '../../services/order.backend.service.js'

export function FinanceDashboard() {
    const [data, setData] = useState({
        weekly: { dates: [], values: [] },
        monthly: { dates: [], values: [] }
    })

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await orderBackendService.query()
            const acceptedOrders = orders.filter(order => 
                order.orderState === 'accepted' || order.orderState === 'completed'
            )

            const weeklyProfits = Array(7).fill(0)
            const monthlyProfits = Array(30).fill(0)

            acceptedOrders.forEach(order => {
                const daysAgo = Math.floor((Date.now() - order.createdAt) / (1000 * 60 * 60 * 24))
                if (daysAgo < 7) {
                    weeklyProfits[6 - daysAgo] += order.price
                }
                if (daysAgo < 30) {
                    monthlyProfits[29 - daysAgo] += order.price
                }
            })

            const weeklyDates = [...Array(7)].map((_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - i)
                return d.toISOString().split('T')[0]
            }).reverse()

            const monthlyDates = [...Array(30)].map((_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - i)
                return d.toISOString().split('T')[0]
            }).reverse()

            setData({
                weekly: { dates: weeklyDates, values: weeklyProfits },
                monthly: { dates: monthlyDates, values: monthlyProfits }
            })
        }
        fetchOrders()
    }, [])

    return (
        <section className="dashboard-finances-container grid">
            <FinanceDashboardInfo />

            <main className="grid finance-charts">
                <div className="chart-section">
                    <Typography variant="h6">Weekly profits from orders</Typography>
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
                    <Typography variant="h6">Monthly profits from orders</Typography>
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
            </main>
        </section>
    )
}