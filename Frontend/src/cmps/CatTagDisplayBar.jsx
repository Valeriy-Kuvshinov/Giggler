import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon.jsx'

export function CatTagDisplayBar({ isFrom, category, tag }) {
  return (
    <section className="explore-category flex">
      <Link to="/">
        {isFrom === 'gigDetails' && <SvgIcon iconName={'homeBlack'} />}
        {isFrom === 'explore' && <SvgIcon iconName={'home'} />}
      </Link>
      <span className="divider">/</span>
      <span className="category">
        {category.replace('---', ' & ').replace('-', ' ')}
      </span>
      {tag && (
        <>
          <span className="divider">/</span>
          <span className="tag">
            {tag.replace('---', ' & ').replace('-', ' ')}
          </span>
        </>
      )}
    </section>
  )
}
