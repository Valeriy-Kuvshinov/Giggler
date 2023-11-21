import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { Pagination } from '../cmps/Pagination.jsx'
import { GigList } from '../cmps/GigList.jsx'
import { GigFilter } from '../cmps/GigFilter.jsx'

import { loadGigs, setFilter } from '../store/gig.actions.js'
import { gigService } from '../services/gig.service.js'

export function GigIndex({onMobileFilter}) {
  const { gigs } = useSelector((storeState) => storeState.gigModule)
  const [searchParams, setSearchparams] = useSearchParams()
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const [isRenderedChoice, setIsRenderedChoice] = useState([false, ''])

  const currentPage = filterBy.page || 1
  const totalGigsPerPage = 12
  const totalPages = Math.ceil(gigs.length / totalGigsPerPage)

  const startIndex = (currentPage - 1) * totalGigsPerPage
  const endIndex = startIndex + totalGigsPerPage
  const currentGigs = gigs.slice(startIndex, endIndex)

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
        break
    }
    setFilter(updatedFilterBy)
    setIsRenderedChoice([false, ''])
  }

  function onDeleteFilter(filterToDelete) {
    if (filterToDelete === ('min' || 'max'))
      setFilter({ ...filterBy, [filterToDelete]: undefined })

    setFilter({ ...filterBy, [filterToDelete]: '' })
  }

  function onHandleChoice(renderedChoice) {
    if (
      (renderedChoice === isRenderedChoice[1] && isRenderedChoice[0]) ||
      (renderedChoice === 'category' && isRenderedChoice[0])
    ) {
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
      case 'category':
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

  
  function handlePageChange(newPage) {
    setFilter({ ...filterBy, page: newPage })
  }

  const categorySelect = filterBy.cat ? filterBy.cat : 'category'

  return (
    <main className="gig-index flex column full">
      <GigFilter
        filterBy={filterBy}
        setMenuFilter={setMenuFilter}
        onHandleChoice={onHandleChoice}
        isRenderedChoice={isRenderedChoice}
        onDeleteFilter={onDeleteFilter}
        onMobileFilter={onMobileFilter}
      />
      <GigList gigs={currentGigs} />
      <Pagination
        currentPage={filterBy.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  )
}
