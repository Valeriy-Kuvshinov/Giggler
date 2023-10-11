import React from "react"
import { Routes, Route } from "react-router"
import routes from "./routes"
import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from "./cmps/AppFooter"
import { GigDetails } from "./pages/GigDetails.jsx"

export function RootCmp() {
  return (
    <main className="main-container">
      <AppHeader />
      <main className="full">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {/* <Route path="/gig/:id" component={GigDetails} /> */}
        </Routes>
      </main>
      <AppFooter />
    </main>
  )
}
