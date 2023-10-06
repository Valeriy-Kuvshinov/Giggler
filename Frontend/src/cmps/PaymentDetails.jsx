
export function PaymentDetails(){
    return (<section>
        <h2>Payment Option</h2>
        <div>
            <span>Credit & Debit Cards</span>
            <img/>
        </div>
        <div>
            <span>Card Number</span>
            <input type="text" id="crdNum" placeholder="XXXX XXXX XXXX XXXX"/>
        </div>
        <div>
            <div>
                <span>Expiration Date</span>
                <input type='date' id="expDate"/>
            </div>
            <div>
                <span>Security Code</span>
                <input type='number' id="pinCode" placeholder="XXX"/>
            </div>
        </div>
        <div>
            <span>First Name</span>
            <input type="text" id="firstName" placeholder="first name"/>
        </div>
        <div>
            <span>Last Name</span>
            <input type="text" id="LastName" placeholder="last name"/>
        </div>
        </section>)
}