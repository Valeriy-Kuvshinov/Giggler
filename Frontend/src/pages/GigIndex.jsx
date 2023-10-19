import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from '../cmps/Pagination.jsx'
import { GigList } from '../cmps/GigList.jsx'
import { GigFilter } from '../cmps/GigFilter.jsx'
import { loadGigs, setFilter } from '../store/gig.actions.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { gigService } from '../services/gig.service.js'

export function GigIndex() {
  const { gigs } = useSelector((storeState) => storeState.gigModule)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const [isRenderedChoice, setIsRenderedChoice] = useState([false, ''])
  const [searchParams, setSearchparams] = useSearchParams()
  const navigate = useNavigate()
  const queryParams = {}
  for (const [key, value] of searchParams) {
    queryParams[key] = value
  }
  console.log('queryParams in index: ', queryParams)

  useEffect(() => {
    loadSetParams()
    loadsGigs()
  }, [filterBy])

  async function loadsGigs() {
    try {
      await loadGigs(filterBy)
    } catch (err) {
      console.log('Error getting gigs to gigIndex: ', err)
    }
  }

  function loadSetParams() {
    const newQueryParam = {}
    Object.keys(filterBy).map((key) => {
      if (filterBy[key]) newQueryParam[key] = filterBy[key]
    })
    setSearchparams(newQueryParam)
  }

  // function setFilterFromParams() {
  //   const queryParamsToFilterMap = {
  //     search: 'search',
  //     time: 'time',
  //     min: 'min',
  //     max: 'max',
  //     level: 'level',
  //     cat: 'cat',
  //     tag: 'tag',
  //   }

  //   const updatedFilterBy = { ...filterBy }

  //   for (const queryParamKey in queryParamsToFilterMap) {
  //     if (queryParams[queryParamKey]) {
  //       const filterKey = queryParamsToFilterMap[queryParamKey]

  //       if (filterKey === 'min' || filterKey === 'max') {
  //         updatedFilterBy[filterKey] = parseInt(queryParams[queryParamKey], 10)
  //       } else if (filterKey === 'cat' || filterKey === 'tag') {
  //         updatedFilterBy[filterKey] = queryParams[queryParamKey]
  //           .replace('---', ' & ')
  //           .replace('-', ' ')
  //       } else {
  //         updatedFilterBy[filterKey] = queryParams[queryParamKey]
  //       }
  //     }
  //   }
  //   return updatedFilterBy
  // }

  function setMenuFilter(event, selectedOption) {
    event.preventDefault()
    let updatedFilterBy = { ...filterBy }

    switch (isRenderedChoice[1]) {
      case 'delivery_time':
        updatedFilterBy = { ...filterBy, time: selectedOption }
        break

      case 'budget':
        if (selectedOption.min) {
          updatedFilterBy = { ...updatedFilterBy, min: selectedOption.min }
        }
        if (selectedOption.max) {
          updatedFilterBy = { ...updatedFilterBy, max: selectedOption.max }
        }
        break

      case 'seller_level':
        updatedFilterBy = { ...updatedFilterBy, level: selectedOption }
        break

      case 'category':
        updatedFilterBy = { ...updatedFilterBy, cat: selectedOption }
        break

      // Handle subcategories
      case 'Graphics & Design':
      case 'Programming & Tech':
      case 'Digital Marketing':
      case 'Video & Animation':
      case 'Writing & Translation':
      case 'Music & Audio':
      case 'Business':
      case 'Data':
      case 'Photography':
      case 'AI Services':
        updatedFilterBy = { ...updatedFilterBy, tag: selectedOption }
        break

      case 'clear':
        updatedFilterBy = gigService.getDefaultFilter()
        break

      default:
        // Handle any other cases or defaults
        break
    }
    setFilter(updatedFilterBy)
    setIsRenderedChoice([false, ''])
  }

  function onHandleChoice(renderedChoice) {
    if (renderedChoice === isRenderedChoice[1] && isRenderedChoice[0]) {
      setIsRenderedChoice([false, ''])
      return
    }
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
        setIsRenderedChoice([true, categorySelect.trim()])
        break
      case 'clear':
        setFilter(gigService.getDefaultFilter())
        setIsRenderedChoice([false, 'clear'])
        break
      default:
        console.log('default switch in onHandleChoice')
        break
    }
  }

  const categorySelect = filterBy.cat ? filterBy.cat : 'category'

  return (
    <main className="gig-index main-layout">
      <GigFilter
        filterBy={filterBy}
        setMenuFilter={setMenuFilter}
        onHandleChoice={onHandleChoice}
        isRenderedChoice={isRenderedChoice}
      />
      <GigList gigs={gigs} />
      <Pagination />
    </main>
  )
}
