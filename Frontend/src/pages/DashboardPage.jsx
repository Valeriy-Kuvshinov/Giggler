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
    const [labelPrices, setLabelPrices] = useState({})
    const [inventoryByLabel, setInventoryByLabel] = useState({})
    const [lineChartData, setLineChartData] = useState({})
    const [toys, setToys] = useState([])

    const filterBy = gigService.getDefaultFilter()
    const sort = gigService.getDefaultSort()

    useEffect(() => {
        async function fetchData() {
            try {
                const initialToys = await gigService.query(filterBy, sort)
                setToys(initialToys)

                // Calculate average prices per label
                let labelPriceCount = {}
                initialToys.forEach(toy => {
                    toy.labels.forEach(label => {
                        labelPriceCount[label] = (labelPriceCount[label] || { sum: 0, count: 0 })
                        labelPriceCount[label].sum += toy.price
                        labelPriceCount[label].count += 1
                    })
                })

                let avgLabelPrices = {}
                Object.keys(labelPriceCount).forEach(label => {
                    avgLabelPrices[label] = parseFloat((labelPriceCount[label].sum / labelPriceCount[label].count))
                })
                setLabelPrices(avgLabelPrices)

                // Calculate inventory by label
                let labelInventoryCount = {}
                initialToys.forEach(toy => {
                    toy.labels.forEach(label => {
                        labelInventoryCount[label] = (labelInventoryCount[label] || { inStock: 0, outOfStock: 0 })
                        if (toy.inStock) labelInventoryCount[label].inStock += 1
                        else labelInventoryCount[label].outOfStock += 1
                    })
                })
                setInventoryByLabel(labelInventoryCount)

                // Generate random numbers for line chart
                const dates = [...Array(7)].map((_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() - i)
                    return d.toISOString().split('T')[0]
                }).reverse()
                const values = [...Array(7)].map(() => Math.floor(Math.random() * 1000))
                setLineChartData({ dates, values })
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
        <main className="dashboard-page flex flex-column">
            <div className='dashboard-container-header flex flex-column'>
                <h1>Welcome dear manager!</h1>
                <h2>Here is our most updated business statistics:</h2>
            </div>
            <section className='dashboard-container'>
                <DashboardInfo initialToys={toys} lineChartData={lineChartData} avgLabelPrices={labelPrices} inventoryByLabel={inventoryByLabel} />

                <div className="chart-section">
                    <Typography variant="h6">Current average price per label</Typography>
                    <Bar
                        data={{
                            labels: Object.keys(labelPrices),
                            datasets: [{
                                label: 'Average Price',
                                data: Object.values(labelPrices),
                                backgroundColor: '#42a5f5',
                            }]
                        }}
                    />
                </div>
                <div className="chart-section">
                    <Typography variant="h6">Current amount of toys in-stock</Typography>
                    <Doughnut
                        data={{
                            labels: Object.keys(inventoryByLabel),
                            datasets: [{
                                data: Object.values(inventoryByLabel).map(labelData => labelData.inStock),
                                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#c45850', '#8e5ea2', '#3cba9f', '#e8c3b9'],
                            }]
                        }}
                    />
                </div>
                <div className="chart-section">
                    <Typography variant="h6">Daily overall toy sales</Typography>
                    <Line
                        data={{
                            labels: lineChartData.dates,
                            datasets: [{
                                label: 'Profits in $',
                                data: lineChartData.values,
                                borderColor: '#3e95cd',
                                fill: false,
                            }]
                        }}
                    />
                </div>
            </section>
        </main>
    )
}