import { InfoDiv } from "./InfoDiv.jsx"

export function DashboardInfo({ initialToys, lineChartData, avgLabelPrices, inventoryByLabel }) {
    const toysInStock = initialToys.filter(toy => toy.inStock).length

    // Toys out of stock
    const toysOutOfStock = initialToys.length - toysInStock

    // Average toy price
    const totalToyPrice = initialToys.reduce((acc, toy) => acc + toy.price, 0)
    const averageToyPrice = totalToyPrice / initialToys.length

    // Today's profits and the difference from the day before
    const todayProfits = lineChartData.values?.[lineChartData.values.length - 1] || 0
    const prevDayProfits = lineChartData.values?.[lineChartData.values.length - 2] || 0
    const profitDifference = todayProfits - prevDayProfits
    const profitDisplay = `$${todayProfits} (${profitDifference >= 0 ? '+' : ''}$${profitDifference.toFixed(2)})`

    // Highest and lowest label price (avg)
    const labels = Object.keys(avgLabelPrices)
    const prices = Object.values(avgLabelPrices)

    const highestPrice = Math.max(...prices)
    const lowestPrice = Math.min(...prices)

    const highestLabel = labels[prices.indexOf(highestPrice)]
    const lowestLabel = labels[prices.indexOf(lowestPrice)]

    const highestLabelPrice = `${highestLabel} - ${highestPrice.toFixed(2)}`
    const lowestLabelPrice = `${lowestLabel} - ${lowestPrice.toFixed(2)}`

    // Largest and smallest label in stock
    const inventoryLabels = Object.keys(inventoryByLabel)
    const inventoryValues = inventoryLabels.map(label => inventoryByLabel[label].inStock)

    const largestInventory = Math.max(...inventoryValues)
    const smallestInventory = Math.min(...inventoryValues)

    const largestLabel = inventoryLabels[inventoryValues.indexOf(largestInventory)]
    const smallestLabel = inventoryLabels[inventoryValues.indexOf(smallestInventory)]

    const largestLabelInStock = `${largestLabel} - ${largestInventory}`
    const smallestLabelInStock = `${smallestLabel} - ${smallestInventory}`

    return (
        <section className="info-section">
            <div className="grid-container">
                <InfoDiv title="Toys in stock" info={toysInStock} />
                <InfoDiv title="Toys out of stock" info={toysOutOfStock} />
                <InfoDiv title="Average toy price" info={`$ ${averageToyPrice.toFixed(2)}`} />
                <InfoDiv title="Today's profits" info={profitDisplay} />
                <InfoDiv title="Highest label price (avg)" info={highestLabelPrice} />
                <InfoDiv title="Lowest label price (avg)" info={lowestLabelPrice} />
                <InfoDiv title="Largest label in stock" info={largestLabelInStock} />
                <InfoDiv title="Smallest label in stock" info={smallestLabelInStock} />
            </div>
        </section>
    )
}