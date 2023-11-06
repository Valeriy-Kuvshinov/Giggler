import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useModal } from '../customHooks/ModalContext.jsx'

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { BuyerOrders } from './BuyerOrders.jsx'

import { logout } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AsideMenu({ user, onClose }) {
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
                    <Link to="/explore" onClick={onClose}> Explore </Link>
                    <Link to="/" onClick={onClose}>Become a Seller</Link>
                    <Link to={`/user/${user._id}`} onClick={onClose}>Profile</Link>
                    <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Typography>Orders</Typography>
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