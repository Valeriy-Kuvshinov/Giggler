import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Line, Pie } from 'react-chartjs-2'
import { gigService } from '../services/gig.service.js'
import { userService } from '../services/user.service.js'
import { UserDashboardInfo } from './UserDashboardInfo.jsx'
import { pieGigsChartOptions, lineUsersChartOptions } from '../services/chartService.js'

export function UserDashboard() {
    const [usersOverTime, setUsersOverTime] = useState({})
    const [topUsersByGigs, setTopUsersByGigs] = useState({})

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

            setTopUsersByGigs({
                labels: sortedUsersByGigs.map(user => user.username),
                data: sortedUsersByGigs.map(user => userGigCounts[user._id])
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
                    <Typography variant="h6">Top 10 Users (by Gigs)</Typography>
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
            </main>
        </section>
    )
}