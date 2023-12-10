const noResultsImg = 'https://res.cloudinary.com/dgwgcf6mk/image/upload/v1701539881/Giggler/other/bzqrborygalzssnmogax.png'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { Pagination } from '../cmps/Pagination.jsx'
import { GigList } from '../cmps/GigList.jsx'
import { GigFilter } from '../cmps/GigFilter.jsx'

import { loadGigs, setFilter } from '../store/gig.actions.js'
import { gigService } from '../services/gig.service.js'

export function GigIndex({ onMobileFilter, onFooterUpdate }) {
  const { gigs } = useSelector((storeState) => storeState.gigModule)
  const isLoading = useSelector(storeState => storeState.gigModule.isLoading)
  const [searchParams, setSearchparams] = useSearchParams()
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const [isRenderedChoice, setIsRenderedChoice] = useState([false, ''])
  const [mobileState, setMobileState] = useState(false)

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

  useEffect(() => {
    if (!isLoading) onFooterUpdate()
  }, [isLoading, onFooterUpdate])

  function loadSetParams() {
    const newQueryParam = {}
    Object.keys(filterBy).map((key) => {
      if (filterBy[key]) newQueryParam[key] = filterBy[key]
    })
    setSearchparams(newQueryParam)
  }

  function setMenuFilter(event, selectedOption) {
    event.preventDefault()
    let updatedFilterBy = { ...filterBy, page: 1 }

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

  function setMobileFilter(mobileFilter) {
    setFilter({ ...filterBy, ...mobileFilter })
  }

  function clearAllFilters() {
    setFilter(gigService.getDefaultFilter())
  }

  function handlePageChange(newPage) {
    setFilter({ ...filterBy, page: newPage })
  }

  function onMobileFilterState() {
    setMobileState((prevState) => !prevState)
  }

  const categorySelect = filterBy.cat ? filterBy.cat : 'category'

  return (
    <main
      className="gig-index flex column full"
      style={mobileState ? { zIndex: 50 } : {}}
    >
      <GigFilter
        filterBy={filterBy}
        setMenuFilter={setMenuFilter}
        onHandleChoice={onHandleChoice}
        isRenderedChoice={isRenderedChoice}
        setIsRenderedChoice={setIsRenderedChoice}
        onDeleteFilter={onDeleteFilter}
        onMobileFilter={onMobileFilter}
        setMobileFilter={setMobileFilter}
        mobileState={mobileState}
        onMobileFilterState={onMobileFilterState}
      />
      {currentGigs.length ? (
        <>
          <GigList gigs={currentGigs} isLoading={isLoading} />
          <Pagination
            currentPage={filterBy.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <section className="gigless">
          <h2>We couldn't find Gigs that match your search</h2>
          <button className="clr-filter" onClick={() => clearAllFilters()}>
            clear all filters
          </button>
          <img src={noResultsImg} />
        </section>
      )}
    </main>
  )
}
