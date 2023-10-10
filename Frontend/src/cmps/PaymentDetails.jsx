import SvgIcon from './SvgIcon'
import visa from '../assets/img/svg/visa.icon.svg'

export function PaymentDetails({createOrder}){

    function checkInfo(){
        if(document.getElementById('crdNum').value.length!==16){
            alert('enter a valid credit card number')
            return
        }
        else if(document.getElementById('expDate').valueAsNumber<Date.now()){
            alert('please use a none expired credit card')
            return
        }
        else if(document.getElementById('pinCode').value<100||document.getElementById('pinCode').value>=1000){
            alert('please use a none expired credit card')
            return
        }
        else if(document.getElementById('firstName').value===''||document.getElementById('lastName').value===''){
            alert('please enter your name')
            return
        }
        console.log('test')
        return true
    }

    function createOrder(){
        return createOrder(checkInfo)
    }

    function onAddToy() {
        const ToyToSave = toyService.getEmptyToy()
        saveToy(ToyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add Toy', err)
                showErrorMsg('Cannot add Toy')
            })
    }


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
            <input type="text" id="lastName"/>
        </div>
        </div>
        {/* <button onClick={checkInfo}>check</button> */}
        </section>)
}