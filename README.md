# Giggler
a React Freelance Service Marketplace Project

## Overview

Welcome to Giggler, our freelancing marketplace where you could get assistant from professionals for a cheap price from all around the world,
dont hesistate to look at a user' profile or their service' reviews for better reasurance the service is to your liking.

## Features

- **rich variety**: In our app you can find many options for every service in different prices from different regions in multiple languages so all of our users could get the service they need.

- **quick service**: In the gig page any user can start a chat with the seller to get furthur details before spending your precious hard earned money, you may always look back previous chat in the chats page.

- **immediate notifications**: Thanks to the usage of sockets, a way to notify the computer that a action was made, a user will get a immediate notifcation.

## Behind the Scenes Features

- **redux**: We use the store with reducers and actions to use the data across the website with updating at real time

- **socket**: For real time updates of orders, reviews and the chat feature, we use the socket npm library so each user, either the freelancer or the one ordering the gig, will be updated at moment notice

- **mongoDb**: The method of storage for the users, gigs, orders, reviews and chats are all inside collections in a database using MongoDb, the demodata used in the website was made by us, the developer team.

- **cloudinary**: to store our images, user provided images and some svgs we used Cloudinary as our storage service, it even deletes unused images provided by users to not waste the storage space.

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

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Valeriy-Kuvshinov/Giggler.git
   cd giggler
   ```

2. **Install Dependencies:**
   ```bash
   npm i
   ```

3. **Run the Application:**
   ```bash
   npm run dev
   ```

   Access the application at [http://localhost:3030](http://localhost:5173) in your web browser.

## Acknowledgments

Special thanks to contributors and open-source projects that inspired and supported the development of this Weather Reports project.

Enjoy exploring and analyzing weather data with the Weather Reports project! If you have any questions or feedback, feel free to reach out.

Happy coding! 🌦️
