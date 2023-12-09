import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { ProgressCircle } from "./ProgressCircle.jsx"

export function SellerSummary({ loggedInUser, displayedOrders }) {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    const isThisYear = (date) => new Date(date).getFullYear() === currentYear
    const isThisMonth = (date) => {
        const d = new Date(date)
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    }

    const totalOrders = displayedOrders.length
    const deniedOrdersCount = displayedOrders.filter(order => order.orderState === 'pending').length
    const pendingOrdersCount = displayedOrders.filter(order => order.orderState === 'denied').length
    const inProgressOrdersCount = displayedOrders.filter(order => order.orderState === 'accepted').length
    const completedOrdersCount = displayedOrders.filter(order => order.orderState === 'completed'
        || order.orderState === 'reviewed').length
    const reviewedOrdersCount = displayedOrders.filter(order => order.orderState === 'reviewed').length

    const deniedOrdersPercentage = (deniedOrdersCount / totalOrders) * 100
    const pendingOrdersPercentage = (pendingOrdersCount / totalOrders) * 100
    const inProgressOrdersPercentage = (inProgressOrdersCount / totalOrders) * 100
    const completedOrdersPercentage = (completedOrdersCount / totalOrders) * 100
    const reviewedOrdersPercentage = (reviewedOrdersCount / totalOrders) * 100

    const thisYearIncome = displayedOrders
        .filter(order => isThisYear(order.completedAt))
        .reduce((acc, order) => acc + order.price, 0)

    const thisMonthIncome = displayedOrders
        .filter(order => isThisMonth(order.completedAt))
        .reduce((acc, order) => acc + order.price, 0)

    const ordersCompletedThisYear = displayedOrders
        .filter(order => isThisYear(order.completedAt)).length

    const ordersCompletedThisMonth = displayedOrders
        .filter(order => isThisMonth(order.completedAt)).length

    return (
        <main className="seller-summary flex column">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="orders-info-content"
                    id="orders-info-header"
                >
                    <Typography variant="h6">Orders Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="info-area grid">
                        <div className="info-cell flex column">
                            <label>Pending</label>
                            <ProgressCircle percentage={pendingOrdersPercentage} />
                        </div>
                        <div className="info-cell flex column">
                            <label>Denied</label>
                            <ProgressCircle percentage={deniedOrdersPercentage} />
                        </div>
                        <div className="info-cell flex column">
                            <label>In progress</label>
                            <ProgressCircle percentage={inProgressOrdersPercentage} />
                        </div>
                        <div className="info-cell flex column">
                            <label>Completed overall</label>
                            <ProgressCircle percentage={completedOrdersPercentage} />
                        </div>
                        <div className="info-cell flex column">
                            <label>Completed on time</label>
                            <ProgressCircle percentage={90} />
                        </div>
                        <div className="info-cell flex column">
                            <label>Reviewed</label>
                            <ProgressCircle percentage={reviewedOrdersPercentage} />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="earnings-content"
                    id="earnings-header"
                >
                    <Typography variant="h6">Earnings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="info-area grid">
                        <div className="info-cell flex column">
                            <h4>Net income</h4>
                            <p>{`$${loggedInUser.balance}`}</p>
                        </div>
                        <div className="info-cell flex column">
                            <h4>Withdrawn</h4>
                            <p>${200}</p>
                        </div>
                        <div className="info-cell flex column">
                            <h4>Yearly revenue</h4>
                            <p>{`$${thisYearIncome}`}</p>
                        </div>
                        <div className="info-cell flex column">
                            <h4>Monthly revenue</h4>
                            <p>{`$${thisMonthIncome}`}</p>
                        </div>
                        <div className="info-cell flex column">
                            <h4>Orders completed this year</h4>
                            <p>{ordersCompletedThisYear}</p>
                        </div>
                        <div className="info-cell flex column">
                            <h4>Orders completed this month</h4>
                            <p>{ordersCompletedThisMonth}</p>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </main>
    )
}