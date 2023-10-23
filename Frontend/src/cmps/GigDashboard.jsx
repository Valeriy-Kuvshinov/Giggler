import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Line, Pie, Bar } from 'react-chartjs-2'
import { gigService } from '../services/gig.service.js'
import { GigDashboardInfo } from './GigDashboardInfo.jsx'
import { barGigsChartOptions, pieGigsChartOptions, lineGigsChartOptions } from '../services/chartService.js'

export function GigDashboard() {
    const [avgCategoryPrices, setAvgCategoryPrices] = useState({})
    const [topCategories, setTopCategories] = useState({})
    const [gigsOverTime, setGigsOverTime] = useState({})

    useEffect(() => {
        const fetchGigs = async () => {
            const gigs = await gigService.query()
            const categoryPrices = {}
            const categoryCounts = {}
            let dateCounts = {}

            gigs.forEach(gig => {
                if (categoryPrices[gig.category]) {
                    categoryPrices[gig.category] += gig.price
                    categoryCounts[gig.category]++
                }
                else {
                    categoryPrices[gig.category] = gig.price
                    categoryCounts[gig.category] = 1
                }

                const date = new Date(gig.createdAt).toISOString().split('T')[0]
                dateCounts[date] = (dateCounts[date] || 0) + 1
            })
            const categories = Object.keys(categoryPrices)
            const averages = categories.map(cat => categoryPrices[cat] / categoryCounts[cat])
            setAvgCategoryPrices({ categories, averages })

            const sortedCategories = Object.entries(categoryCounts).sort(([, aCount], [, bCount]) => bCount - aCount).slice(0, 10)
            setTopCategories({
                categories: sortedCategories.map(entry => entry[0]),
                counts: sortedCategories.map(entry => entry[1])
            })

            const dateLabels = Object.keys(dateCounts).sort()
            const dateData = dateLabels.map(date => dateCounts[date])

            setGigsOverTime({ labels: dateLabels, data: dateData })
        }
        fetchGigs()
    }, [])

    return (
        <section className='dashboard-gigs-container'>
            <h2>Gigs General Info:</h2>

            <GigDashboardInfo />

            <main className='grid gigs-charts'>
                <div className="chart-section">
                    <Typography variant="h6">New Gigs Over Time</Typography>
                    <Line
                        data={{
                            labels: gigsOverTime.labels,
                            datasets: [{
                                data: gigsOverTime.data,
                                borderColor: '#404145',
                                fill: true,
                                backgroundColor: 'rgba(145, 194, 245)'
                            }]
                        }}
                        options={lineGigsChartOptions}
                    />
                </div>

                <div className="chart-section">
                    <Typography variant="h6">Most Common (by category)</Typography>
                    <Pie
                        data={{
                            labels: topCategories.categories,
                            datasets: [{
                                data: topCategories.counts,
                                backgroundColor: [
                                    '#FF6384', '#36A2EB', '#FFCE56', '#FF5733',
                                    '#33FF57', '#8533FF', '#33B5FF', '#FF8333',
                                    '#B833FF', '#FF335E'
                                ]
                            }]
                        }}
                        options={pieGigsChartOptions}
                    />
                </div>

                <div className="chart-section">
                    <Typography variant="h6">Average Price by Category</Typography>
                    <Bar
                        data={{
                            labels: avgCategoryPrices.categories,
                            datasets: [{
                                data: avgCategoryPrices.averages,
                                backgroundColor: '#404145',
                                borderColor: '#222325',
                                borderWidth: 1
                            }]
                        }}
                        options={barGigsChartOptions}
                    />
                </div>
            </main>
        </section>
    )
}