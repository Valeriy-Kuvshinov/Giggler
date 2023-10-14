export function InfoDiv({ title, info }) {
    return (
        <div className="grid-item">
            <div className="title">{title}</div>
            <div className="info">{info}</div>
        </div>
    )
}