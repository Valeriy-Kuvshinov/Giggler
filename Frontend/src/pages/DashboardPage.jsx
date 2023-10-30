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

import { UserOrders } from '../cmps/dashboardCmps/UserOrders.jsx'

export function DashboardPage() {
    const [tabValue, setTabValue] = useState(0)

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    return (
        <main className="dashboard-page full flex column">
            <Box sx={{ margin: 'auto', width: '100%', typography: 'body1', maxWidth: '1400px' }}>
                <h3>Manage your orders:</h3>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs" centered>
                    <Tab label="Orders you got" />
                    <Tab label="Orders you sent" />
                </Tabs>
                <Box p={4}>
                    {tabValue === 0 && <UserOrders type="received" />}
                    {tabValue === 1 && <UserOrders type="sent" />}
                </Box>
            </Box>
        </main>
    )
}