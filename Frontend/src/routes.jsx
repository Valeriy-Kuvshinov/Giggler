import { HomePage } from './pages/HomePage.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { GigIndex } from './pages/GigIndex.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { GigPurchase } from './pages/GigPurchase.jsx'
import { GigEdit } from './pages/GigEdit.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { Chat } from './pages/Chat.jsx'

// import { Testing } from './pages/Testing.jsx'

const routes = [
    { path: '/', component: HomePage},
    { path: '/explore/', component: GigIndex},
    { path: '/gig/:id', component: GigDetails },
    { path: '/user/:id', component: UserProfile},
    { path: '/gig/edit/:id?', component: GigEdit },
    { path: '/purchase/:id', component: GigPurchase},
    { path: '/dashboard', component: DashboardPage},
    { path: '/orders', component: OrdersPage},
    { path: '/chat/:id', component: Chat},
    // { path: '/testing', component: Testing, label: 'testing'} Used for Development
]

export default routes