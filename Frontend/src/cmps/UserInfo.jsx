import catto from '../assets/img/catto.avif'
import icon from '../assets/img/svg/user.icon.svg'
import location from '../assets/img/svg/location.icon.svg'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { userService } from "../services/user.service.js"


export function UserInfo(){

    const [users,setUsers]=useState([])

    useEffect(()=>
    {
        userService.getUsers().then(users=>setUsers(users))
    },[])

    if(users.length===0)return 
    // const user=userService.getById('u102')
    // console.log(users[1])

    return (<section className='user-info'>
        <div className='info-block'>
            <img src={users[1].avatar}/>
            <h2>{users[1].fullName}</h2>
            <div className='into-line'>
                <span><img src={location}/> Country</span>
                <span>Israel</span>
            </div>
            <div className='into-line'>
                <span><img src={icon}/> Member Since</span>
                <span>May 42069</span>
            </div>

        </div>
        <div className='info-block'>
            <h3>Description</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                 Sint voluptatum eius architecto assumenda, quaerat a.
                  Beatae consequuntur possimus iste,pariatur hic impedit at modi,
                   rem quam velit debitis. Fugiat, magni!</p>
        </div>
            </section>)
}