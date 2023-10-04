import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { SurveyIndex } from './pages/SurveyIndex.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { GigIndex } from './pages/GigIndex.jsx'


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
        label: 'Details'
    },
    {
        path: 'explore',
        component: <GigIndex />,
        label: 'Explore'
    },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes