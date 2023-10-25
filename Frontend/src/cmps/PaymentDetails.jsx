import SvgIcon from "./SvgIcon"
import creditCards from "../assets/img/svg/credit.cards.icon.svg"

export function PaymentDetails({ createOrder }) {
  function checkInfo() {
    const crdNum = document.getElementById("crdNum").value
    const expDate = document.getElementById("expDate").value
    const pinCode = document.getElementById("pinCode").value
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value

    if (crdNum.length !== 16) {
      alert("enter a valid credit card number")
      return
    // } else if (expDate < Date.now()) {
    //   alert("please use a none expired credit card")
    //   return
    } else if (pinCode < 100 || pinCode >= 1000) {
      alert("please use a none expired credit card")
      return
    } else if (firstName === "" || lastName === "") {
      alert("please enter your name")
      return
    }
    var receipt = {
      fullName: firstName + " " + lastName,
      createdAt: Date.now(),
      creditNum: "************" + (parseInt(crdNum) % 10000),
    }
    console.log(receipt)
    return true
  }

  function loadDemo() {
    document.getElementById("crdNum").value = 1111222233334444
    console.log(new Date().getFullYear())
    document.getElementById("expDate").value = new Date().getMonth()+1+'/'+new Date().getFullYear()%100
    document.getElementById("pinCode").value = 123
    document.getElementById("firstName").value = "poki"
    document.getElementById("lastName").value = "mon"
  }

  function createOrder() {
    return checkInfo
  }

  setTimeout(loadDemo, 1)

  return (
    <section className="payment-details">

      <section className="details one">
        <span>Payment Options</span>
      </section>

      <section className="details two">
        <div className="credit-type">
          <input type="radio" id="credit" className="credit"/>
          <span>Credit & Debit Cards</span>
          <img className="visa" src={creditCards} />
        </div>
      </section>

      <section className="details three">
        <div className="credit-details">
          <div className="credit-number">
            <span>Card Number</span>
            <input type="text" id="crdNum" placeholder="0000 0000 0000 0000" />
          </div>
          <div className="private">
            <div className="credit-date">
              <span>Expiration Date</span>
              <input type="text" id="expDate" placeholder="MM/YY"/>
            </div>

            <div className="credit-date">
              <span>Security Code</span>
              <input type="text" id="pinCode" placeholder="XXX" />
            </div>
          </div>

          <div className="private">
            <div className="buyer-info">
              <span>First Name</span>
              <input type="text" id="firstName" />
            </div>

            <div className="buyer-info">
              <span>Last Name</span>
              <input type="text" id="lastName" />
            </div>
          </div>
        </div>
      {/* <button onClick={checkInfo}>check</button> */}
      </section>

    </section>
  )
}
