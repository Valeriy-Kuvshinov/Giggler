export function InfoDiv({ title, info, imgSrc }) {
    return (
        <div className="grid-item">
            <div className="title">{title}</div>
            <div className="info">{info}</div>
            <img src={imgSrc} alt={title} className="icon" />
        </div>
    )
}