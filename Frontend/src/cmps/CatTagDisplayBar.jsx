import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'

export function CatTagDisplayBar({ category, tag }) {
  return (
    <section className="explore-category">
      <Link to="/">
        <SvgIcon iconName={'homeBlack'} />
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
