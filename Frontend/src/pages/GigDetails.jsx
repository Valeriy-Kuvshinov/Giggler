import { GigHeader } from "../cmps/GigHeader"
import { AboutGig } from "../cmps/AboutGig"
import { AboutSeller } from "../cmps/AboutSeller"
import { GigOrder } from "../cmps/GigOrder"
import { GigReviews } from "../cmps/GigReviews"

export function GigDetails() {
  return (
    <section 
    // className="gig-details"
    className="gig-details main-container full"
    >
      <section className="gig">
      <div className="gig-info">
      <GigHeader/>
      <AboutGig/>
      <AboutSeller/>
      <GigReviews/>
      </div>
      <GigOrder/>
      </section>
    </section>
  )
}
