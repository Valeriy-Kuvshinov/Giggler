import { Link, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SvgIcon from './SvgIcon.jsx'
import { MenuFilterContent } from './MenuFilterContent.jsx'

export function GigFilter(filterBy) {
  const [searchParams] = useSearchParams()
  const [isSticky, setIsSticky] = useState(false)
  const [isRenderedChoice, setIsRenderedChoice] = useState([false, ''])
  const queryParams = {}
  let shadowStart = 139
  for (const [key, value] of searchParams) {
    queryParams[key] = value
  }
  const categorySelect = queryParams.cat
    ? queryParams.cat.replace('---', ' & ').replace('-', ' ')
    : 'category'

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    // console.log('search params: ', queryParams)
  }, [searchParams])
  // console.log('search after useEffect: ', queryParams)

  function handleScroll() {
    queryParams.cat ? (shadowStart = 197) : (shadowStart = 139)
    if (window.scrollY >= shadowStart) setIsSticky(true)
    else setIsSticky(false)
  }

  function setMenuFilter() {
    // console.log('I AM IN SET MENU FILTER!')
    
  }

  function onHandleChoice(renderedChoice) {
     switch (renderedChoice) {
      case 'seller_level':
        setIsRenderedChoice([true, 'seller_level'])
        break
      case 'delivery_time':
        setIsRenderedChoice([true, 'delivery_time'])
        break
      case 'budget':
        setIsRenderedChoice([true, 'budget'])
        break
      case 'categories':
        setIsRenderedChoice([true, categorySelect])
        break

      default:
        console.log('default switch in onHandleChoice')
        break
    }
  }
  console.log('IS RENDERED CHOICE !: ', isRenderedChoice[1])
  return (
    <>
      <div className="gig-results-title layout-row">
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
      </div>
      <main className={`gig-filter layout-row ${isSticky ? 'shadow' : ''}`}>
        <section className="floating-top-bar">
          <div className="filter-nav">
            <button className="btn filtered-clr">Clear Filter</button>
            <div
              className={`filter-categories floating-menu ${
                isRenderedChoice[1] === categorySelect ? 'open' : ''
              }`}
            >
              <button
                onClick={() => onHandleChoice('categories')}
                className="btn filtered-sc"
              >
                {categorySelect.charAt(0).toUpperCase() +
                  categorySelect.slice(1)}
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
                {(isRenderedChoice[1] === 'category' ||
                  isRenderedChoice[1] === queryParams.cat) && (
                    <MenuFilterContent
                      renderedChoice={isRenderedChoice[1]}
                      setMenuFilter={setMenuFilter}
                    />
                  )}
              </button>
            </div>
            <div
              className={`filter-seller-level floating-menu ${
                isRenderedChoice[1] === 'seller_level' ? 'open' : ''
              }`}
            >
              <button
                onClick={() => onHandleChoice('seller_level')}
                className="btn filtered-sl"
              >
                Seller level
                <span className="dwn-arr">
                  <SvgIcon iconName={'arrowDown'} />
                </span>
                {isRenderedChoice[1] === 'seller_level' && (
                  <MenuFilterContent
                    renderedChoice={isRenderedChoice[1]}
                    setMenuFilter={setMenuFilter}
                  />
                )}
              </button>
            </div>
            <div
              className={`filter-budget floating-menu ${
                isRenderedChoice[1] === 'budget' ? 'open' : ''
              }`}
            >
              <button
                onClick={() => onHandleChoice('budget')}
                className="btn filtered-bg"
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
              className={`filter-delivery-time floating-menu ${
                isRenderedChoice[1] === 'delivery_time' ? 'open' : ''
              }`}
            >
              <button
                onClick={() => onHandleChoice('delivery_time')}
                className="btn filtered-dt"
              >
                Delivery Time
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
    </>
  )
}
