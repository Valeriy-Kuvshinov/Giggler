import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from '../cmps/Pagination.jsx'
import { GigList } from '../cmps/GigList.jsx'
import { GigFilter } from '../cmps/GigFilter.jsx'
import { loadGigs } from '../store/gig.actions.js'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function GigIndex() {
  const { gigs } = useSelector((storeState) => storeState.gigModule)
  let filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  console.log('filterBy in index: ', filterBy)
  const [isRenderedChoice, setIsRenderedChoice] = useState([false, ''])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryParams = {}
  for (const [key, value] of searchParams) {
    queryParams[key] = value
  }

  // const [currentPage, setCurrentPage] = useState(0)
  // const itemsPerPage = 12

  // const startIndex = currentPage * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  // const displayedGigs = gigs.slice(startIndex, endIndex)

  useEffect(() => {
    try {
      loadsGigs()
    } catch (err) {
      console.log('Oops.. something went wrong fetching gigs, try again', err)
    }
  }, [filterBy, searchParams])

  async function loadsGigs() {
    try {
      await loadGigs(filterBy)
    } catch (err) {
      console.log('Error getting gigs to gigIndex: ', err)
    }
  }

  function setMenuFilter(event, selectedOption) {
    event.preventDefault()
    console.log('selectedOption: ', selectedOption)
    // const navigate = useNavigate()
    const updatedQueryParams = { ...queryParams }
    let updatedFilterBy = { ...filterBy }

    switch (isRenderedChoice[1]) {
      case 'delivery_time':
        updatedQueryParams['time'] = selectedOption
        filterBy = { ...updatedFilterBy, time: selectedOption }
        break

      case 'budget':
        if (selectedOption.min) {
          updatedQueryParams['min'] = selectedOption.min
          filterBy = { ...filterBy, min: selectedOption.min }
        }
        if (selectedOption.max) {
          updatedQueryParams['max'] = selectedOption.max
          filterBy = { ...filterBy, max: selectedOption.max }
        }
        break

      case 'seller_level':
        updatedQueryParams['level'] = selectedOption
        filterBy = { ...filterBy, level: selectedOption }
        break

      case 'category':
        updatedQueryParams['cat'] = selectedOption
          .replace(' & ', '---')
          .replace(' ', '-')
        filterBy = { ...filterBy, cat: selectedOption }
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
        filterBy = { ...filterBy, tag: selectedOption }
        break

      default:
        // Handle any other cases or defaults
        break
    }

    const searchParams = new URLSearchParams(updatedQueryParams)

    const newURL = `?${searchParams.toString()}`

    console.log('filterBy end of menuFilter: ', filterBy)
    navigate(newURL)

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
      <GigList
        gigs={gigs}
      />
      <Pagination />
    </main>
  )
}
//   const [currentPage, setCurrentPage] = useState(0)
//   const itemsPerPage = 12

//   const startIndex = currentPage * itemsPerPage
//   const endIndex = startIndex + itemsPerPage
//   const displayedGigs = gigs.slice(startIndex, endIndex)

// function onAddGigMsg(gig) {
//     console.log(`TODO Adding msg to gig`)
// }
// function shouldShowActionBtns(gig) {
//     const user = userService.getLoggedinUser()
//     if (!user) return false
//     if (user.isAdmin) return true
//     return gig.owner?._id === user._id
// }

//   previousLabel={'Previous'}
//   nextLabel={'Next'}
//   pageCount={Math.ceil(gigs.length / itemsPerPage)}
//   onPageChange={({ selected }) => setCurrentPage(selected)
