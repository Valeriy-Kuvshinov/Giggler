import SvgIcon from './SvgIcon'
import visa from '../assets/img/svg/visa.icon.svg'

export function PaymentDetails({createOrder}){

    function checkInfo(){
        const crdNum=document.getElementById('crdNum').value
        const expDate=document.getElementById('expDate').valueAsNumber
        const pinCode=document.getElementById('pinCode').value
        const firstName=document.getElementById('firstName').value
        const lastName=document.getElementById('lastName').value

        if(crdNum.length!==16){
            alert('enter a valid credit card number')
            return
        }
        else if(expDate<Date.now()){
            alert('please use a none expired credit card')
            return
        }
        else if(pinCode<100||pinCode>=1000){
            alert('please use a none expired credit card')
            return
        }
        else if(firstName===''||lastName===''){
            alert('please enter your name')
            return
        }
        var receipt={fullName:firstName+' '+lastName,createdAt:Date.now(),creditNum:'************'+parseInt(crdNum)%10000}
        console.log(receipt)
        return true
    }
    
    function loadDemo(){
        document.getElementById('crdNum').value=1111222233334444
        document.getElementById('expDate').valueAsNumber=Date.now()+86400000
        document.getElementById('pinCode').value=123
        document.getElementById('firstName').value='poki'
        document.getElementById('lastName').value='mon'
    } 

    function createOrder(){
        return checkInfo
    }

    setTimeout(loadDemo,1)

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
        {/* <div className='rest-of-details'> */}
            <div className='credit-date'>
                <span>Expiration Date</span>
                <input type='date' id="expDate"/>
            </div>
            <div className='credit-date'>
                <span>Security Code</span>
                <input type='number' id="pinCode" placeholder="XXX"/>
            </div>
        {/* </div> */}
        <div className='buyer-info'>
            <span>First Name</span>
            <input type="text" id="firstName"/>
        </div>
        <div className='buyer-info'>
            <span>Last Name</span>
            <input type="text" id="lastName"/>
        </div>
        </div>
        <button onClick={checkInfo}>check</button>
        </section>)
}