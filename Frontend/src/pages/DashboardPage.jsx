import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend, Filler
} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend, Filler)

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { UserOrders } from '../cmps/UserOrders.jsx'
import { FinanceDashboard } from '../cmps/FinanceDashboard.jsx'
import { UserDashboard } from '../cmps/UserDashboard.jsx'
import { GigDashboard } from '../cmps/GigDashboard.jsx'

export function DashboardPage() {
    const [outerValue, setOuterValue] = useState(0)
    const [innerValue, setInnerValue] = useState(0)

    const handleOuterChange = (event, newValue) => {
        setOuterValue(newValue)
        if (newValue !== 1) setInnerValue(0)
    }

    const handleInnerChange = (event, newValue) => {
        setInnerValue(newValue)
    }

    return (
        <main className="dashboard-page flex column">
            <Box sx={{ width: '100%', typography: 'body0' }}>
                <Tabs value={outerValue} onChange={handleOuterChange} aria-label="dashboard tabs" centered>
                    <Tab label="Personal Dashboard" />
                    <Tab label="Admin Dashboard" />
                </Tabs>
                <Box p={3}>
                    {outerValue === 0 && <UserOrders />}
                    {outerValue === 1 && (
                        <>
                            <div className='dashboard-container-header flex column'>
                                <h1>Welcome dear admin!</h1>
                                <h2>Here is our most updated business statistics:</h2>
                            </div>
                            <Box sx={{ width: '100%', typography: 'body0' }}>
                                <Tabs value={innerValue} onChange={handleInnerChange} aria-label="admin dashboard tabs" centered>
                                    <Tab label="Gig Dashboard" />
                                    <Tab label="User Dashboard" />
                                    <Tab label="Finance Dashboard" />
                                </Tabs>
                                <Box p={3}>
                                    {innerValue === 0 && <GigDashboard />}
                                    {innerValue === 1 && <UserDashboard />}
                                    {innerValue === 2 && <FinanceDashboard />}
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </main>
    )
}