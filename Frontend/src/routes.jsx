import { HomePage } from './pages/HomePage.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { GigIndex } from './pages/GigIndex.jsx'
import { UserProfile } from './pages/UserProfile.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: '/gig/:id',
        component: <GigDetails />,
        label: 'Details'
    },
    {
        path: 'explore',
        component: <GigIndex />,
        label: 'Explore'
    },
    {
        path: 'profile',
        component: <UserProfile />,
        label: 'profile'
    }
]

export default routes