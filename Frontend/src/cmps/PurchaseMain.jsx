import SvgIcon from './SvgIcon.jsx'
import creditCardImage from '../../src/assets/img/credit.card.png'

export function PurchaseMain({
  paymentMethod,
  handlePaymentMethod,
  formData,
  setFormData,
}) {
  const initialState = {
    crdNum: '1111222233334444',
    expDate: `${new Date().getMonth() + 1}/${new Date().getFullYear() % 100}`,
    pinCode: '123',
    firstName: 'Yaron',
    lastName: 'Biton',
  }

  function handleInputChange(e) {
    e.preventDefault()
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <main className="purchase-main">
      <section className="section-header">
        <span>Payment Options</span>
      </section>
      <section className="payment-methods">
        <article
          className="credit-card"
          onClick={() => handlePaymentMethod(true)}
        >
          <label className={`credit-type ${paymentMethod ? 'selected' : ''}`}>
            <input
              type="radio"
              className="credit"
              checked={paymentMethod}
              onChange={() => handlePaymentMethod(true)}
            />
            <span className="radio-btn"></span>
            <span className="text">Credit & Debit Cards</span>
            <SvgIcon iconName={'creditCardsIcon'} />
          </label>

          <div
            className={`credit-card-container ${paymentMethod ? '' : 'hidden'}`}
          >
            <form className="credit-card-form">
              <label className="card-number">
                <span>Card Number</span>
                <div className="card-number-input">
                  <span
                    className="card-logo"
                    style={{
                      backgroundImage: `url(${creditCardImage})`,
                      width: '2em',
                      height: '2em',
                    }}
                  ></span>
                  <input
                    type="text"
                    name="crdNum"
                    value={formData.crdNum || initialState.crdNum}
                    placeholder="0000 0000 0000 0000"
                    onChange={handleInputChange}
                  />
                </div>
              </label>

              <label className="expiration-date">
                <span>Expiration Date</span>
                <input
                  type="text"
                  name="expDate"
                  value={formData.expDate || initialState.expDate}
                  placeholder="MM / YY"
                  onChange={handleInputChange}
                />
              </label>

              <label className="security-code">
                <span>Security Code</span>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode || initialState.pinCode}
                  onChange={handleInputChange}
                />
              </label>

              <label className="first-name">
                <span>First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || initialState.firstName}
                  onChange={handleInputChange}
                />
              </label>

              <label className="last-name">
                <span>Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || initialState.lastName}
                  onChange={handleInputChange}
                />
              </label>
            </form>
          </div>
        </article>
        <article className="paypal" onClick={() => handlePaymentMethod(false)}>
          <label className={`credit-type ${!paymentMethod ? 'selected' : ''}`}>
            <input
              type="radio"
              className="credit"
              checked={!paymentMethod}
              onChange={() => handlePaymentMethod(false)}
            />
            <span className="radio-btn"></span>
            <SvgIcon iconName={'paypalIcon'} />
          </label>
        </article>
      </section>
    </main>
  )
}
