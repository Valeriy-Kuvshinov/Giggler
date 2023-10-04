import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { UserMsg } from './UserMsg.jsx'
import { galleryService } from '../services/gallery.service.js'

export function AppFooter() {
    const { socialMediaIcons } = galleryService

    // const [isCartShown, setIsCartShown] = useState(false)
    // const cart = useSelector(storeState => storeState.carModule.cart)
    // const cartTotal = cart.reduce((acc, car) => acc + car.price, 0)

    // async function onCheckout() {
    //     try {
    //         const score = await checkout(cartTotal)
    //         showSuccessMsg(`Charged, your new score: ${score.toLocaleString()}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot checkout')
    //     }
    // }

    return (
        <footer className="app-footer flex row full">
            <h1 className="logo">fiverr</h1>
            <h2>© Fiverr International Ltd. 2023</h2>
            <div className="social-icons flex row">
                {socialMediaIcons.map((icon, idx) => (
                    <div key={idx} className="icon-container">
                        <img src={icon} className="social-icon" />
                        <a href="https://twitter.com/">link</a>
                    </div>
                ))}
            </div>
            {/*{cart.length > 0 &&
                <h5>
                    <span>{cart.length}</span> Products in your Cart
                    <button className="btn-link" onClick={(ev) => {
                        ev.preventDefault();
                        setIsCartShown(!isCartShown)
                    }}>
                        ({(isCartShown) ? 'hide' : 'show'})
                    </button>
                </h5>
            }

            {isCartShown && cart.length > 0 && <section className="cart" >
                <h5>Your Cart</h5>
                <ul>
                    {
                        cart.map((car, idx) => <li key={idx}>
                            <button onClick={() => {
                                removeFromCart(car._id)
                            }}>x</button>
                            {car.vendor}
                        </li>)
                    }
                </ul>
                <p>Total: ${cartTotal.toLocaleString()} </p>
                <button onClick={onCheckout}>Checkout</button> */}
            <UserMsg />
        </footer>
    )
}