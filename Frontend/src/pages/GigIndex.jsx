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
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryParams = {}
  for (const [key, value] of searchParams) {
    queryParams[key] = value
  }
  console.log('queryParams in index: ', queryParams)

  useEffect(() => {
    loadsGigs()
  }, [])

  async function loadsGigs() {
    try {
      const updatedFilterBy = setFilterFromParams()
      setFilter(updatedFilterBy)
      await loadGigs(updatedFilterBy)
    } catch (err) {
      console.log('Error getting gigs to gigIndex: ', err)
    }
  }

  function setFilterFromParams() {
    const queryParamsToFilterMap = {
      search: 'search',
      time: 'time',
      min: 'min',
      max: 'max',
      level: 'level',
      cat: 'cat',
      tag: 'tag',
    }

    const updatedFilterBy = { ...filterBy }

    for (const queryParamKey in queryParamsToFilterMap) {
      if (queryParams[queryParamKey]) {
        const filterKey = queryParamsToFilterMap[queryParamKey]

        if (filterKey === 'min' || filterKey === 'max') {
          updatedFilterBy[filterKey] = parseInt(queryParams[queryParamKey], 10)
        } else if (filterKey === 'cat' || filterKey === 'tag') {
          updatedFilterBy[filterKey] = queryParams[queryParamKey]
            .replace('---', ' & ')
            .replace('-', ' ')
        } else {
          updatedFilterBy[filterKey] = queryParams[queryParamKey]
        }
      }
    }
    return updatedFilterBy
  }

  function setMenuFilter(event, selectedOption) {
    event.preventDefault()
    let updatedQueryParams = { ...queryParams }
    let updatedFilterBy = { ...filterBy }

    switch (isRenderedChoice[1]) {
      case 'delivery_time':
        updatedQueryParams['time'] = selectedOption
        updatedFilterBy = { ...updatedFilterBy, time: selectedOption }

        break

      case 'budget':
        if (selectedOption.min) {
          updatedQueryParams['min'] = selectedOption.min
          updatedFilterBy = { ...filterBy, min: selectedOption.min }
        }
        if (selectedOption.max) {
          updatedQueryParams['max'] = selectedOption.max
          updatedFilterBy = { ...filterBy, max: selectedOption.max }
        }
        break

      case 'seller_level':
        updatedQueryParams['level'] = selectedOption
        updatedFilterBy = { ...filterBy, level: selectedOption }
        break

      case 'category':
        updatedQueryParams['cat'] = selectedOption
          .replace(' & ', '---')
          .replace(' ', '-')
        updatedFilterBy = { ...filterBy, cat: selectedOption }
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
        updatedQueryParams['tag'] = selectedOption
          .replace(' & ', '---')
          .replace(' ', '-')
        updatedFilterBy = { ...filterBy, tag: selectedOption }
        break

      case 'clear':
        updatedFilterBy = gigService.getDefaultFilter()
        updatedQueryParams = {}
        console.log('updatedfilterby: ', updatedFilterBy)
        break

      default:
        // Handle any other cases or defaults
        break
    }

    const searchParams = new URLSearchParams(updatedQueryParams)

    const newURL = `?${searchParams.toString()}`

    console.log('filterBy end of menuFilter: ', filterBy)
    setFilter(updatedFilterBy)
    setIsRenderedChoice([false, ''])
    navigate(newURL)
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
        const searchParams = new URLSearchParams()
        const newURL = `?${searchParams.toString()}`
        navigate(newURL)
        setIsRenderedChoice([false, 'clear'])
        break
      default:
        console.log('default switch in onHandleChoice')
        break
    }
  }

  const categorySelect = queryParams.cat
    ? queryParams.cat.replace('---', ' & ').replace('-', ' ')
    : 'category'

  return (
    <main className="gig-index main-layout">
      <GigFilter
        filterBy={filterBy}
        setMenuFilter={setMenuFilter}
        onHandleChoice={onHandleChoice}
        queryParams={queryParams}
        isRenderedChoice={isRenderedChoice}
      />
      <GigList gigs={gigs} />
      <Pagination />
    </main>
  )
}
