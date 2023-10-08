import { Link, useParams, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SvgIcon from './SvgIcon'

export function GigFilter(filterBy) {
  const [searchParams] = useSearchParams()
  const queryParams = {}

  for (const [key, value] of searchParams) {
    queryParams[key] = value
  }
  useEffect(() => {
    queryParams
  })
  useEffect(() => {
    console.log('search params: ', queryParams)
  }, [searchParams])
  console.log('search after useEffect: ', queryParams)
  return (
    <main className="gig-filter layout-row">
      {queryParams &&
        (queryParams.search ? (
          <section className="search-param">
            <h1>
              {`Results for `}
              <span className="b">{queryParams.search}</span>
            </h1>
          </section>
        ) : (
          queryParams.cat && (
            <section className="explore-category">
              <Link to="/">
                <SvgIcon iconName={'home'} />
              </Link>
              <span className="divider">/</span>
              <span className="category">
                {queryParams.cat.replace('---', ' & ').replace('-', ' ')}
              </span>
            </section>
          )
        ))}

      <section className="floating-top-bar">
        <div className="filter-nav">
          <button className="btn filtered-clr">
            Clear Filter
            <span>
              <SvgIcon iconName={'arrowDown'} />
            </span>
          </button>
          <div className="filter-subcategories">
            <button className="btn filtered-sc">
              Category
              <span>
                <SvgIcon iconName={'arrowDown'} />
              </span>
            </button>
          </div>
          <div className="filter-budjet">
            <button className="btn filtered-bg">
              Budjet
              <span>
                <SvgIcon iconName={'arrowDown'} />
              </span>
            </button>
          </div>
          <div className="filter-delivery-time">
            <button className="btn filtered-dt">
              Delivery Time
              <span>
                <SvgIcon iconName={'arrowDown'} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
