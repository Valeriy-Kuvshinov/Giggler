import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Line, Pie, Doughnut } from 'react-chartjs-2'
import { gigService } from '../services/gig.service.js'
import { userService } from '../services/user.service.js'
import { UserDashboardInfo } from './UserDashboardInfo.jsx'
import { donutUsersChartOptions, pieGigsChartOptions, pieUsersChartOptions, lineUsersChartOptions } from '../services/chartService.js'

export function UserDashboard() {
    const [usersOverTime, setUsersOverTime] = useState({})
    const [topUsersByGigs, setTopUsersByGigs] = useState({})
    const [topUsersByRating, setTopUsersByRating] = useState({})
    const [sellersVsCustomers, setSellersVsCustomers] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const users = await userService.getUsers()
            const gigs = await gigService.query()

            const dateCounts = {}
            users.forEach(user => {
                const date = new Date(user.createdAt * 1000).toISOString().split('T')[0]
                dateCounts[date] = (dateCounts[date] || 0) + 1
            })
            const dateLabels = Object.keys(dateCounts).sort()
            const dateData = dateLabels.map(date => dateCounts[date])
            setUsersOverTime({ labels: dateLabels, data: dateData })

            const userGigCounts = {}
            users.forEach(user => userGigCounts[user._id] = gigs.filter(gig => gig.ownerId === user._id).length)
            const sortedUsersByGigs = [...users].sort((a, b) => userGigCounts[b._id] - userGigCounts[a._id]).slice(0, 10)
            const sortedUsersByRating = [...users].sort((a, b) => b.rating - a.rating).slice(0, 10)

            setTopUsersByGigs({
                labels: sortedUsersByGigs.map(user => user.username),
                data: sortedUsersByGigs.map(user => userGigCounts[user._id])
            })

            setTopUsersByRating({
                labels: sortedUsersByRating.map(user => user.username),
                data: sortedUsersByRating.map(user => user.rating)
            })

            const sellersCount = users.filter(user => gigs.some(gig => gig.ownerId === user._id)).length
            const customersCount = users.length - sellersCount
            setSellersVsCustomers({
                labels: ['Sellers', 'Customers'],
                data: [sellersCount, customersCount]
            })
        }
        fetchData()
    }, [])

    return (
        <section className='dashboard-users-container'>
            <h2>General Users Info:</h2>

            <UserDashboardInfo />

            <main className='grid users-charts'>
                <div className="chart-section">
                    <Typography variant="h6">New Users Over Time</Typography>
                    <Line
                        data={{
                            labels: usersOverTime.labels,
                            datasets: [{
                                data: usersOverTime.data,
                                borderColor: '#404145',
                                fill: true,
                                backgroundColor: 'rgba(145, 194, 245)'
                            }]
                        }}
                        options={lineUsersChartOptions}
                    />
                </div>

                <div className="chart-section">
                    <Typography variant="h6">Top Users by Gigs</Typography>
                    <Pie
                        data={{
                            labels: topUsersByGigs.labels,
                            datasets: [{
                                data: topUsersByGigs.data,
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
                    <Typography variant="h6">Top Users by Rating</Typography>
                    <Pie
                        data={{
                            labels: topUsersByRating.labels,
                            datasets: [{
                                data: topUsersByRating.data,
                                backgroundColor: [
                                    '#FF6384', '#36A2EB', '#FFCE56', '#FF5733',
                                    '#33FF57', '#8533FF', '#33B5FF', '#FF8333',
                                    '#B833FF', '#FF335E'
                                ]
                            }]
                        }}
                        options={pieUsersChartOptions}
                    />
                </div>

                <div className="chart-section">
                    <Typography variant="h6">Sellers vs Customers</Typography>
                    <Doughnut
                        data={{
                            labels: sellersVsCustomers.labels,
                            datasets: [{
                                data: sellersVsCustomers.data,
                                backgroundColor: ['#FFCE56', '#36A2EB']
                            }]
                        }}
                        options={donutUsersChartOptions}
                    />
                </div>
            </main>
        </section>
    )
}