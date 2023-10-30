import SvgIcon from './SvgIcon.jsx'
import { packages } from '../services/gig.service.js'
import { Link } from 'react-router-dom'

export function PaymentInfo({ gig, createOrder, packageChoice }) {
  if (gig === null) return <div>loading...</div>

  function onConfirmPayment() {
    createOrder()
  }
  console.log('packages: ', packages)
  console.log('packageChoice: ', packageChoice)

  return (
    <section className="payment-info">
      <section className="payment one">
        <div className="payment-header">
          <img src={gig.imgUrls[0]} alt={gig.title} />
          <p>{gig.title}</p>
        </div>
        <div className="order-details-general">
          <span className="b">{packages[packageChoice].type}</span>
          <span>${packages[packageChoice].price * gig.price}</span>
        </div>

        <ul className="features">
          {packages[packageChoice].features.map((feature, idx) => (
            <li key={idx}>
              <SvgIcon
                iconName={
                  packages[packageChoice].featuresCond[idx]
                    ? 'checked'
                    : 'unchecked'
                }
              />
              {feature}
            </li>
          ))}
        </ul>

        <section className="payment">
          <div className="service-fee">
            <span>
              Service fee <SvgIcon iconName={'questionMarkIcon'} />
            </span>
            <span>${parseFloat(gig.price * 0.1).toFixed(2)}</span>
          </div>

          <div className="vat-fee">
            <span>
              VAT <SvgIcon iconName={'questionMarkIcon'} />
            </span>
            <span>${parseFloat(gig.price * 0.1).toFixed(2)}</span>
          </div>

          <div className="total-fee">
            <span>Total</span>
            <span>${parseFloat(gig.price * 1.2).toFixed(2)}</span>
          </div>

          <div className="delivery-time">
            <span>Total Delivery Time</span>
            <span>{packages[packageChoice].time}</span>
          </div>

          <Link to={`/`}>
            <button className="confirm-btn" onClick={onConfirmPayment}>
              Confirm And Pay
            </button>
          </Link>
        </section>
        <div className="secure-payment">
          <span class="lock"></span>
          <span>SSL Secure Payment</span>
        </div>
      </section>
    </section>
  )
}
