
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

    const overdueOrdersCount = displayedOrders.filter(order => {
        if (order.orderState !== 'completed') return false
        const acceptedAt = new Date(order.acceptedAt)
        const completedAt = new Date(order.completedAt)
        const deliveryDuration = parseDeliveryTime(order.deliveryTime)
        return completedAt > new Date(acceptedAt.getTime() + deliveryDuration)
    }).length

    const pendingOrdersPercentage = (pendingOrdersCount / totalOrders) * 100
    const inProgressOrdersPercentage = (inProgressOrdersCount / totalOrders) * 100
    const overdueOrdersPercentage = (overdueOrdersCount / totalOrders) * 100
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
                <h3>General Info</h3>
                <div className="info-area grid">
                    <div className="user-info">
                        <img src={user.imgUrl} alt="user" />
                        <h4>{`@${user.username}`}</h4>
                    </div>
                    <div className="user-progress-one flex column">
                        <label>Pending Orders: {pendingOrdersPercentage.toFixed(2)}%</label>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${pendingOrdersPercentage}%` }}>
                            </div>
                        </div>
                        <label>Orders in Progress: {inProgressOrdersPercentage.toFixed(2)}%</label>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${inProgressOrdersPercentage}%` }}>
                            </div>
                        </div>
                    </div>
                    <div className="user-progress-two flex column">
                        <label>Orders Overdue: {overdueOrdersPercentage.toFixed(2)}%</label>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${overdueOrdersPercentage}%` }}>
                            </div>
                        </div>
                        <label>Orders Completed on Time: {completedOnTimeOrdersPercentage.toFixed(2)}%</label>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${completedOnTimeOrdersPercentage}%` }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="financial-area flex column">
                <h3>Earnings</h3>
                <div className="info-area flex row">
                    <div className="info-cell flex column">
                        <h4>Net Income</h4>
                        <p>{`${user.balance} $`}</p>
                    </div>
                    <div className="info-cell flex column">
                        <h4>Yearly Revenue</h4>
                        <p>{`${thisYearIncome} $`}</p>
                    </div>
                    <div className="info-cell flex column">
                        <h4>Monthly Revenue</h4>
                        <p>{`${thisMonthIncome} $`}</p>
                    </div>
                    <div className="info-cell flex column">
                        <h4>Orders Completed This Year</h4>
                        <p>{ordersCompletedThisYear}</p>
                    </div>
                    <div className="info-cell flex column">
                        <h4>Orders Completed This Month</h4>
                        <p>{ordersCompletedThisMonth}</p>
                    </div>
                </div>
            </section>
        </main>
    )
}