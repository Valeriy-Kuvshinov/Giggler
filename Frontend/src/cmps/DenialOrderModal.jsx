import { orderBackendService } from "../services/order.backend.service"

export function DenialOrderModal({ order, denyOrder }) {
  function onConfirmDenial() {
    try{
        const reason = document.getElementById("denialReason").value
        const newOrder = { ...order }
        // console.log("new order : ", newOrder)
        // console.log("reason added")
        denyOrder(newOrder,reason)
    } catch (err) {
        console.log('couldnt deny order : ',err)
    }
  }

  return (
    <section className="deny-modal">
      <input type="text" id="denialReason" placeholder="reason for denial" className="reason"/>
      <button onClick={onConfirmDenial}>confirm denial</button>
    </section>
  )
}
