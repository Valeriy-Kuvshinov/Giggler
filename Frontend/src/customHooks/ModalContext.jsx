import { createContext, useState, useContext } from 'react'
import { LoginSignup } from '../cmps/LoginSignup.jsx'

const ModalContext = createContext()

export function ModalProvider({ children }) {
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState('login')

    const openLogin = () => {
        setModalMode('login')
        setShowModal(true)
    }

    const openSignup = () => {
        setModalMode('signup')
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <ModalContext.Provider value={{ showModal, modalMode, openLogin, openSignup, closeModal }}>
            {children}
            {showModal && <LoginSignup mode={modalMode} closeModal={closeModal} />}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}