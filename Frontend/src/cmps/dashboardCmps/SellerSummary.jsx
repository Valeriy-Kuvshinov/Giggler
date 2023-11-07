import { ProgressCircle } from "./ProgressCircle.jsx"

export function SellerSummary({ user, displayedOrders }) {
    const parseDeliveryTime = (deliveryTimeString) => {
        const timeValue = parseInt(deliveryTimeString.split(' ')[0], 10)
        const timeUnit = deliveryTimeString.split(' ')[1]
        if (timeUnit === 'days') {
            return timeValue * 24 * 60 * 60 * 1000
        }
    }

    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    const isThisYear = (date) => new Date(date).getFullYear() === currentYear
    const isThisMonth = (date) => {
        const d = new Date(date)
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    }

    const totalOrders = displayedOrders.length
    const pendingOrdersCount = displayedOrders.filter(order => order.orderState === 'pending').length
    const inProgressOrdersCount = displayedOrders.filter(order => order.orderState === 'accepted').length

    const completedOnTimeOrdersCount = displayedOrders.filter(order => {
        if (order.orderState !== 'completed') return false
        const acceptedAt = new Date(order.acceptedAt)
        const completedAt = new Date(order.completedAt)
        const deliveryDuration = parseDeliveryTime(order.deliveryTime)
        return completedAt <= new Date(acceptedAt.getTime() + deliveryDuration)
    }).length

    const pendingOrdersPercentage = (pendingOrdersCount / totalOrders) * 100
    const inProgressOrdersPercentage = (inProgressOrdersCount / totalOrders) * 100
    const completedOnTimeOrdersPercentage = (completedOnTimeOrdersCount / totalOrders) * 100

    const thisYearIncome = displayedOrders
        .filter(order => isThisYear(order.completedAt))
        .reduce((acc, order) => acc + order.price, 0)

    const thisMonthIncome = displayedOrders
        .filter(order => isThisMonth(order.completedAt))
        .reduce((acc, order) => acc + order.price, 0)

    const ordersCompletedThisYear = displayedOrders
        .filter(order => isThisYear(order.completedAt))
        .length

    const ordersCompletedThisMonth = displayedOrders
        .filter(order => isThisMonth(order.completedAt))
        .length

    return (
        <main className="seller-summary">
            <section className="general-area flex column">
                <h3>Orders Info</h3>
                <div className="info-area flex">
                    <div className="info-cell flex column">
                        <label>Pending</label>
                        <ProgressCircle percentage={pendingOrdersPercentage} />
                    </div>
                    <div className="info-cell flex column">
                        <label>In progress</label>
                        <ProgressCircle percentage={10} />
                    </div>
                    <div className="info-cell flex column">
                        <label>Completed overall</label>
                        <ProgressCircle percentage={90} />
                    </div>
                    <div className="info-cell flex column">
                        <label>Completed on time</label>
                        <ProgressCircle percentage={90} />
                    </div>
                    <div className="info-cell flex column">
                        <label>Reviewed</label>
                        <ProgressCircle percentage={85} />
                    </div>
                </div>
            </section>

            <section className="financial-area flex column">
                <h3>Earnings</h3>
                <div className="info-area flex">
                    <div className="info-cell flex column">
                        <h4>Net income</h4>
                        <p>{`$${user.balance}`}</p>
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
            </section>
        </main>
    )
}