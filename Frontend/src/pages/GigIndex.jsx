import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gigService } from '../services/gig.service.local.js'
import { Pagination } from '../cmps/Pagination.jsx'
import { GigList } from '../cmps/GigList.jsx'
import { GigFilter } from '../cmps/GigFilter.jsx'
import { loadGigs, saveGig, removeGig } from '../store/gig.actions.js'

export function GigIndex() {
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const dispatch = useDispatch()

  useEffect(() => {
    loadGigs(filterBy)
        .catch((err) => {
            console.log('Oops.. something went wrong, try again', err)
        })
}, [filterBy])

  function onRemoveGig(gigId) {
    try {
      dispatch(removeGig(gigId))
      showSuccessMsg('Gig removed')
    } catch (err) {
      showErrorMsg('Cannot remove Gig')
    }
  }

  function onAddGig() {
    const gig = gigService.getEmptyGig()
    try {
      dispatch(saveGig(gig))
      showSuccessMsg(`Gig added`)
    } catch (err) {
      showErrorMsg('Cannot add gig')
    }
  }

  function onUpdateGig(gig) {
    const gigToSave = { ...gig }
    try {
      dispatch(saveGig(gigToSave))
      showSuccessMsg(`Gig updated`)
    } catch (err) {
      showErrorMsg('Cannot update gig')
    }
  }

  return (
    <main className="gig-index main-layout">
      <GigFilter filterBy={filterBy} />
      <GigList
        gigs={gigs}
        onRemoveGig={onRemoveGig}
        onUpdateGig={onUpdateGig}
        onAddGig={onAddGig}
      />
      <Pagination
      />
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
//   onPageChange={({ selected }) => setCurrentPage(selected)}
//   containerClassName={'pagination'}
//   activeClassName={'active'}