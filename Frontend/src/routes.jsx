import { HomePage } from './pages/HomePage.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { GigIndex } from './pages/GigIndex.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { GigPurchase } from './pages/GigPurchase.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { GigEdit } from './pages/GigEdit.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'

const routes = [
    { path: '/', component: HomePage, label: 'Home 🏠' },
    { path: '/user/:id', component: UserDetails },
    { path: '/explore/', component: GigIndex, label: 'Explore' },
    { path: '/gig/:id', component: GigDetails, label: 'Details' },
    { path: '/profile/', component: UserProfile, label: 'profile' },
    // { path: '/gig/edit', component: GigEdit },
    { path: '/gig/edit/:id', component: GigEdit },
    // { path: '/purchase/', component: GigPurchase },
    { path: '/purchase/:id', component: GigPurchase, label: 'purchase' },
    { path: '/login', component: LoginSignup, label: 'Login' }
]

export default routes