
export function SellerSummary({ user, displayedOrders }) {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    const isThisYear = (date) => {
        return new Date(date).getFullYear() === currentYear
    }

    const isThisMonth = (date) => {
        const d = new Date(date)
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    }

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