import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from '../cmps/Pagination.jsx'
import { GigList } from '../cmps/GigList.jsx'
import { GigFilter } from '../cmps/GigFilter.jsx'
import { loadGigs } from '../store/gig.actions.js'

export function GigIndex() {
  const { gigs } = useSelector((storeState) => storeState.gigModule)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  console.log('filterBy in index: ',filterBy);
  // const [currentPage, setCurrentPage] = useState(0)
  // const itemsPerPage = 12

  // const startIndex = currentPage * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  // const displayedGigs = gigs.slice(startIndex, endIndex)

  useEffect(() => {
    try{
      loadsGigs()
    }
    catch(err) {
      console.log('Oops.. something went wrong fetching gigs, try again', err)
    }
  }, [filterBy])

  async function loadsGigs(){
    try{
      await loadGigs(filterBy)
    }
    catch(err) {
      console.log('Error getting gigs to gigIndex: ',err)
    }
  }

  // function onSetFilter(filterBy) {
  //   setToyFilter(filterBy)
  //   setCurrentPage(0)
  // }

  return (
    <main className="gig-index main-layout">
      <GigFilter filterBy={filterBy} />
      <GigList
        // gigs={displayedGigs}
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
