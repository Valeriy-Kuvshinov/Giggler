import SvgIcon from './SvgIcon'
import visa from '../assets/img/svg/visa.icon.svg'

export function PaymentDetails(){
    return (<section className='payment-details'>
        <h2>Payment Option</h2>
        <div className='credit-type'>
            <span>Credit & Debit Cards</span>
            <img className="visa" src={visa}/>
        </div>
        <div className='credit-details'>
        <div className='credit-number'>
            <span>Card Number</span>
            <input type="text" id="crdNum" placeholder="XXXX XXXX XXXX XXXX"/>
        </div>
        <div className='rest-of-details'>
            <div className='credit-date'>
                <span>Expiration Date</span>
                <input type='date' id="expDate" />
            </div>
            <div className='credit-date'>
                <span>Security Code</span>
                <input type='number' id="pinCode" placeholder="XXX"/>
            </div>
        </div>
        <div className='buyer-info'>
            <span>First Name</span>
            <input type="text" id="firstName"/>
        </div>
        <div className='buyer-info'>
            <span>Last Name</span>
            <input type="text" id="LastName"/>
        </div>
        </div>
        </section>)
}