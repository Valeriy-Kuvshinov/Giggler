import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2'
import { gigService } from '../services/gig.service.js'
import { UserDashboardInfo } from './UserDashboardInfo.jsx'
import { donutGigsChartOptions, barGigsChartOptions, pieGigsChartOptions, lineGigsChartOptions } from '../services/chartService.js'

export function UserDashboard() {

    return (
        <section className='dashboard-users-container'>
            <h2>General Users Info:</h2>

            <UserDashboardInfo />
        </section>
    )
}