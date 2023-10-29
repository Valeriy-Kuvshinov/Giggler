export function InfoListItem({ imgSrc, title, description }) {
    return (
        <li>
            <div className="flex row">
                <img src={imgSrc} />
                <h3>{title}</h3>
            </div>
            <p>{description}</p>
        </li>
    )
}