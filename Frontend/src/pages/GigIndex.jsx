import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig } from '../store/gig.actions.js'
import { Pagination } from '../cmps/Pagination.jsx'
import { GigList } from '../cmps/GigList.jsx'
import { GigFilter } from '../cmps/GigFilter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { gigService } from '../services/gig.service.local.js'

export function GigIndex() {
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

  
  //   const [currentPage, setCurrentPage] = useState(0)
  //   const itemsPerPage = 12

  //   const startIndex = currentPage * itemsPerPage
  //   const endIndex = startIndex + itemsPerPage
  //   const displayedGigs = gigs.slice(startIndex, endIndex)

  useEffect(() => {
    loadGigs()
  }, [])

  async function onRemoveGig(gigId) {
    try {
      await removeGig(gigId)
      showSuccessMsg('Gig removed')
    } catch (err) {
      showErrorMsg('Cannot remove Gig')
    }
  }

  async function onAddGig() {
    const gig = gigService.getEmptyGig()
    gig.title = prompt('Title?')
    try {
      const savedGig = await addGig(gig)
      showSuccessMsg(`Gig added (id: ${savedGig._id})`)
    } catch (err) {
      showErrorMsg('Cannot add gig')
    }
  }

  async function onUpdateGig(gig) {
    const price = +prompt('New price?')
    const gigToSave = { ...gig, price }
    try {
      const savedGig = await updateGig(gigToSave)
      showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
    } catch (err) {
      showErrorMsg('Cannot update gig')
    }
  }

  function onSetFilter(filterBy) {
    setGigFilter(filterBy)
    setCurrentPage(0)
  }

  // function onAddGigMsg(gig) {
  //     console.log(`TODO Adding msg to gig`)
  // }
  // function shouldShowActionBtns(gig) {
  //     const user = userService.getLoggedinUser()
  //     if (!user) return false
  //     if (user.isAdmin) return true
  //     return gig.owner?._id === user._id
  // }

  return (
    <main className="gig-index-Layout">
      <GigFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <GigList
        gigs={gigs}
        onRemoveGig={onRemoveGig}
        onUpdateGig={onUpdateGig}
        onAddGig={onAddGig}
      />
      <Pagination
      //   previousLabel={'Previous'}
      //   nextLabel={'Next'}
      //   pageCount={Math.ceil(gigs.length / itemsPerPage)}
      //   onPageChange={({ selected }) => setCurrentPage(selected)}
      //   containerClassName={'pagination'}
      //   activeClassName={'active'}
      />
    </main>
  )
}
