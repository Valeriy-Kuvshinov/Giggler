import { PaymentDetails } from "../cmps/PaymentDetails"
import { PaymentInfo } from "../cmps/PaymentInfo"

import { useParams } from "react-router-dom"

export function GigPurchase() {
  const params = useParams()
  const id = params.id

  return (
    <section className="main-container">
      <section className="gig-purchase">
        <PaymentDetails />
        <PaymentInfo gigId={id} />
      </section>
    </section>
  )
}
