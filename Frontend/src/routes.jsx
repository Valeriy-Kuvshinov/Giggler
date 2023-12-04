import { Home } from './pages/Home.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { GigIndex } from './pages/GigIndex.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { GigPurchase } from './pages/GigPurchase.jsx'
import { GigEdit } from './pages/GigEdit.jsx'
import { SellerDashboard } from './pages/SellerDashboard.jsx'
import { BuyerDashboard } from './pages/BuyerDashboard.jsx'
import { Chat } from './pages/Chat.jsx'
import { About } from './pages/About.jsx'

// import { Testing } from './pages/Testing.jsx'

const routes = [
    { path: '/', component: Home},
    { path: '/explore/', component: GigIndex},
    { path: '/gig/:id', component: GigDetails },
    { path: '/user/:id', component: UserProfile},
    { path: '/gig/edit/:id?', component: GigEdit },
    { path: '/purchase/:id', component: GigPurchase},
    { path: '/dashboard', component: SellerDashboard},
    { path: '/orders', component: BuyerDashboard},
    { path: '/chat/:id', component: Chat},
    {path: '/about', component: About}
    // { path: '/testing', component: Testing, label: 'testing'} Used for Development
]

export default routes