import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { CarIndex } from './pages/CarIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { SurveyIndex } from './pages/SurveyIndex.jsx'
import { BabaIndex } from './pages/BabaIndex.jsx'
import { GigDetails } from './pages/GigDetails.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'gigdetails',
        component: <GigDetails />,
        label: 'details'
    },
    {
        path: 'car',
        component: <CarIndex />,
        label: 'Cars'
    },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes