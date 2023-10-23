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
                    return `$${context.raw.toFixed(2)} per gig`
                }
            }
        }
    }
}

export const pieGigsChartOptions = {
    aspectRatio: 2,
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
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

export const donutGigsChartOptions = {
    aspectRatio: 2,
    cutout: '50%',
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

export const pieUsersChartOptions = {
    aspectRatio: 2,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return ` ${context.raw} / 5 stars`
                }
            }
        }
    }
}

export const lineUsersChartOptions = {
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
                    return `${context.raw.toFixed(0)} new users`
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

export const donutUsersChartOptions = {
    aspectRatio: 2,
    cutout: '50%',
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return ` ${context.raw} users`
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
                title: function () {
                    return ''
                },
                label: function (context) {
                    return `$${context.raw.toFixed(0)}`
                }
            }
        }
    }
}