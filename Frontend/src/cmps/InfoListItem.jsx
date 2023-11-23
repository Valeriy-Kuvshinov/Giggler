import SvgIcon from "./SvgIcon.jsx"

export function InfoListItem({ title, description }) {
    return (
        <li>
            <div className="flex row">
                <SvgIcon iconName={'customCheckmarkIcon'} />
                <h3>{title}</h3>
            </div>
            <p>{description}</p>
        </li>
    )
}