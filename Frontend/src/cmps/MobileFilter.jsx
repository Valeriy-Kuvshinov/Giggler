import SvgIcon from './SvgIcon'

export function MobileFilter(filterBy) {
  return (
    <main className="mobile-filter">
      <section className="mobile-filter-header">
        <div className="wrapper">
          <SvgIcon iconName={'remove'} />
          <span>Filter all</span>
        </div>
        <span className="clear">Clear all</span>
      </section>
      <section className="filter-form">

      </section>
    </main>
  )
}
