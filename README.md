# Giggler 
A Freelancing Service Marketplace / React & Javascript project for educational purposes 

Giggler is now live: [ https://giggler.onrender.com/](https://giggler.onrender.com/)

## **Overview**
Welcome to Giggler, a robust freelancing marketplace designed to facilitate seamless interactions between buyers and sellers. Explore a variety of services and connect with professionals worldwide.

## **Key Technologies & Features**
**React & Redux:** Utilizing React for a responsive, dynamic frontend, integrated with Redux for efficient state management.

**Node.js & Express.js:** Powering the backend with Node.js and Express.js to handle server-side logic and API routing.

**MongoDB:** Employing MongoDB for efficient data storage and management of users, gigs, orders, chats, and reviews.

**Hooks & Custom Hooks:** Leveraging React hooks and custom hooks for optimized functionality and reusability in the codebase.

**Real-time Communication (Sockets):** Implementing sockets for instant notifications on order updates, chat messages, and "is typing" indications.

**Full CRUDL Functionality:** Providing comprehensive CRUDL operations across the platform with dedicated pages for gig listings (/explore) and filtering options.

**Private Chat:** Enabling seamless, private communication between buyers and sellers for enhanced interaction and clarification.

**Seller & Buyer Dashboard:** Offering dedicated dashboards for sellers and buyers, showcasing order details and facilitating seamless communication to ensure a smooth order process.

**Fully Responsive Design:** Ensuring a user-friendly experience across various devices, from desktops to mobile.

**Mongo Aggregation:** Employing MongoDB's aggregation for complex and efficient searches within the database.

**Database Management:** Structuring data within MongoDB collections for users, gigs, orders, chats, and reviews.



## Highlights
**Backend Server Logic:** Robust backend implementation with specific routing for API endpoints and comprehensive server-side operations.

**Real-time Notifications:** Instant updates on order statuses and chat interactions using sockets for seamless communication.

**Advanced Filtering & Gig Listing:** Extensive filtering options (/explore) for gigs based on delivery time, seller level, categories, and price range.

**Seller & Buyer Dashboards:** Dedicated dashboards for sellers and buyers to manage orders, track progress, and communicate effectively at every step of the order process.

**Profile Customization:** Detailed user profiles supporting seamless transitions between buyer and seller roles.

**Fully Responsive Design:** Responsive web design ensuring compatibility across mobile and desktop platforms.


## Code Sample

```bash
import { useEffect } from 'react'

function outsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export default outsideClick
```

The following code sample is a custom React hook, designed to detect and handle clicks outside a specified DOM element. The custom hook is used for implementing functionalities like closing a dropdown menu, modal, or any floating UI element when a user clicks outside of it's area.<br>
The 'outsideClick' custom hook provides a way to execute a callback function whenever a click event occurs outside of a specified element.<br>
The custom hook receives the 'ref' (a React ref object created by useRef) and callback (function) params, for pointing to the DOM element that's wished to have outside click detection, and executing the callback when the outside click happens.<br>
An example for using the custom hook, when closing a dropdown menu by clicking outside the menu:<br>

```bash
import { useState, useEffect, useRef } from 'react'
import outsideClick from '../../customHooks/outsideClick.js'

export function SellerOrder({object, functions}){
const [isDropdownVisible, setDropdownVisible] = useState(false)
const dropdownMenuRef = useRef(null)
outsideClick(dropdownMenuRef, () => setDropdownVisible(false))
}
```

## Giggler Pages Display

**Main Page** 

![main page](https://res.cloudinary.com/dgwgcf6mk/image/upload/v1701984839/Giggler/gig-images/jo1djom9s10sljgfkjj2.png)

**Profile Page**

![profile page](https://res.cloudinary.com/dgwgcf6mk/image/upload/v1701984857/Giggler/gig-images/qp76gxhvnyctivy3vu6w.png)

**Explore Page**

![explore page](https://res.cloudinary.com/dgwgcf6mk/image/upload/v1702383458/Screenshot_2023-12-12_141609_myuzj5.png)

**Gig Details**

![gig details](https://res.cloudinary.com/dgwgcf6mk/image/upload/v1702383458/Screenshot_2023-12-12_141703_rofcmz.png)

## Getting Started

To begin using the Freelancing Services project, follow these steps:

**Clone the Repository:**
```bash
git clone https://github.com/Valeriy-Kuvshinov/Giggler.git
cd giggler
```

**Install Dependencies:**
```bash
npm i
```

 **Run the Application:**
```bash
npm run dev
```

Access the application in the backend using http://localhost:3030 and in the frontend using http://localhost:5173 in your web browser.

## Acknowledgments

Special thanks to contributors and open-source projects and Fiverr that inspired and supported the development of this Freelancers Service project.

Happy coding!
