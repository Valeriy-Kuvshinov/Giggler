import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import personOne from '../assets/img/Christina.png'
import { utilService } from '../services/util.service'

export function HomePage() {

    return (
        <section className='home-wrapper'>
            <img src={personOne} alt="Logo" style={{ maxWidth: '300px' }} />
        </section >
    )
}