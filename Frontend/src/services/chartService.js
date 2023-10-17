export const barGigsChartOptions = {
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                title: function () {
                    return ''
                },
                label: function (context) {
                    return `$${context.raw} per gig`
                }
            }
        }
    }
}

export const pieGigsChartOptions = {
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return ` ${context.raw} gigs`
                }
            }
        }
    }
}

export const lineGigsChartOptions = {
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                title: function () {
                    return ''
                },
                label: function (context) {
                    return `${context.raw.toFixed(0)} new gigs`
                }
            }
        }
    }
}

export const lineMoneyChartOptions = {
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                title: function() {
                    return ''
                },
                label: function(context) {
                    return `$${context.raw.toFixed(2)}`
                }
            }
        }
    }
}