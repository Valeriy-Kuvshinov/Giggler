import React, { useEffect, useState } from 'react'
import SvgIcon from './SvgIcon.jsx'
import { MenuFilterContent } from './MenuFilterContent.jsx'
import { CatTagDisplayBar } from './CatTagDisplayBar.jsx'
import { SelectedFilters } from './SelectedFilters.jsx'

export function GigFilter({
  filterBy,
  setMenuFilter,
  onHandleChoice,
  isRenderedChoice,
  onDeleteFilter,
}) {
  const [isSticky, setIsSticky] = useState(false)
  let shadowStart = 139
  const categorySelect = filterBy.cat ? filterBy.cat : 'category'

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleScroll() {
    filterBy.cat ? (shadowStart = 197) : (shadowStart = 139)
    if (window.scrollY >= shadowStart) setIsSticky(true)
    else setIsSticky(false)
  }

  return (
    <>
      <div className="gig-results-title layout-row">
        {filterBy.search && (
          <section className="search-param">
            <h1>
              {`Results for `}
              <span className="b">{filterBy.search}</span>
            </h1>
          </section>
        )}
        {filterBy.cat && (
          <CatTagDisplayBar category={filterBy.cat} tag={filterBy.tag} />
        )}
      </div>
      <main className={`gig-filter layout-row ${isSticky ? 'shadow' : ''}`}>
        <section className="floating-top-bar">
          <div className="filter-nav">
            <button
              onClick={() => onHandleChoice('clear')}
              className="btn filtered-clr"
              title="Clear all filters"
            >
              Clear filter
            </button>

            <div
              className={`filter-categories floating-menu ${isRenderedChoice[1] === categorySelect.trim() ? 'open' : ''
                }`}
            >
              <button
                onClick={() => onHandleChoice('category')}
                className="btn filtered-sc"
              >
                {categorySelect.charAt(0).toUpperCase() +
                  categorySelect.slice(1)}
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
              </button>
              {(isRenderedChoice[1] === 'category' ||
                isRenderedChoice[1] === categorySelect.trim()) && (
                  <MenuFilterContent
                    renderedChoice={isRenderedChoice[1]}
                    setMenuFilter={setMenuFilter}
                  />
                )}
            </div>

            <div
              className={`filter-seller-level floating-menu ${isRenderedChoice[1] === 'seller_level' ? 'open' : ''
                }`}
            >
              <button
                onClick={() => onHandleChoice('seller_level')}
                className={`btn filtered-sl ${filterBy.level ? 'border' : ''}`}
              >
                Seller level
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
              </button>
              {isRenderedChoice[1] === 'seller_level' && (
                <MenuFilterContent
                  renderedChoice={isRenderedChoice[1]}
                  setMenuFilter={setMenuFilter}
                />
              )}
            </div>

            <div
              className={`filter-budget floating-menu ${isRenderedChoice[1] === 'budget' ? 'open' : ''
                }`}
            >
              <button
                onClick={() => onHandleChoice('budget')}
                className={`btn filtered-bg ${filterBy.min || filterBy.max ? 'border' : ''
                  }`}
              >
                Budget
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
              </button>
              {isRenderedChoice[1] === 'budget' && (
                <MenuFilterContent
                  renderedChoice={isRenderedChoice[1]}
                  setMenuFilter={setMenuFilter}
                />
              )}
            </div>

            <div
              className={`filter-delivery-time floating-menu ${isRenderedChoice[1] === 'delivery_time' ? 'open' : ''
                }`}
            >
              <button
                onClick={() => onHandleChoice('delivery_time')}
                className={`btn filtered-dt ${filterBy.time ? 'border' : ''}`}
              >
                Delivery time
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
              </button>

              {isRenderedChoice[1] === 'delivery_time' && (
                <MenuFilterContent
                  renderedChoice={isRenderedChoice[1]}
                  setMenuFilter={setMenuFilter}
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <SelectedFilters filterBy={filterBy} onDeleteFilter={onDeleteFilter} />
    </>
  )
}