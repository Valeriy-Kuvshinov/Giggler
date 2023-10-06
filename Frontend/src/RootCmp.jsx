import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

import { GigDetails } from './pages/GigDetails'
import { GigIndex } from './pages/GigIndex'
import { HomePage } from './pages/HomePage'
import { UserDetails } from './pages/UserDetails'
import { UserProfile } from './pages/UserProfile'
import { GigEdit } from './pages/GigEdit'
import { GigPurchase } from './pages/GigPurchase'

export function RootCmp() {
    return (
        <main className='main-container'>
            <AppHeader />
            <main className='full'>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user/:id" element={<UserDetails />} />
                    <Route path="/explore/" element={<GigIndex />} />
                    <Route path="/gig/:id" element={<GigDetails />} />
                    <Route path="/profile/" element={<UserProfile />} />
                    <Route path="/gig/edit" element={<GigEdit />} />
                    <Route path="/gig/edit/:id" element={<GigEdit />} />
                    <Route path="/purchase/" element={<GigPurchase />} />
                    <Route path="/purchase/:id" element={<GigPurchase />} />
                </Routes>
            </main>
            <AppFooter />
        </main>
    )
}