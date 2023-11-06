import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useModal } from '../customHooks/ModalContext.jsx'

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { BuyerOrders } from './BuyerOrders.jsx'

import { logout } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AsideMenu({ user, onClose }) {
    let fullName
    let firstName
    let lastName
    if (user) {
        fullName = user.fullName.split(' ')
        firstName = fullName[0]
        lastName = fullName[fullName.length - 1]
    }
    const navigate = useNavigate()
    const { openLogin, openSignup } = useModal()

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    async function onLogout() {
        try {
            await logout()
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <div className="aside-menu flex column">
            {user ? (
                <>
                    <div className='top-icons flex row'>
                        <div className='user-info grid'>
                            <img src={user.imgUrl} alt="user" />
                            <span>{firstName}</span>
                            <span>{lastName}</span>
                        </div>
                    </div>
                    <Link to="/explore" onClick={onClose}> Explore </Link>
                    <Link to="/" onClick={onClose}>Become a Seller</Link>
                    <Link to={`/user/${user._id}`} onClick={onClose}>Profile</Link>
                    <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
                    <Accordion
                        sx={{
                            '&::before': {
                                display: 'none',
                            },
                        }}
                        expanded={expanded === 'panel1'}
                        onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Typography style={{ color: '#62646a', fontFamily: 'macan-regular' }}>Orders</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            onClick={(e) => e.stopPropagation()}
                        >
                            <BuyerOrders user={user} onClose={onClose} />
                        </AccordionDetails>
                    </Accordion>
                    <button className="logout" onClick={onLogout}>Logout</button>
                </>
            ) : (
                <>
                    <button className="join" onClick={() => {
                        onClose()
                        openSignup()
                    }}>
                        Join
                    </button>
                    <button className="login" onClick={() => {
                        onClose()
                        openLogin()
                    }}>
                        Sign In
                    </button>
                    <Link to="/explore" onClick={onClose}> Explore </Link>
                    <Link to="/" onClick={onClose}>Become a Seller</Link>
                </>
            )}
        </div>
    )
}