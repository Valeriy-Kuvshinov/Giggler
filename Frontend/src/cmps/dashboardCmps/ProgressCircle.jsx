export function ProgressCircle({ percentage }) {
    const radius = 35
    const circumference = 2 * Math.PI * radius
    const strokePercentage = ((100 - percentage) / 100) * circumference

    return (
        <div className="progress-circle">
            <svg>
                <circle cx="40" cy="40" r={radius} className="progress-background" />
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    className="progress-bar"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokePercentage}
                />
            </svg>
            <div className="number">
                {percentage.toFixed(0)}%
            </div>
        </div>
    )
}