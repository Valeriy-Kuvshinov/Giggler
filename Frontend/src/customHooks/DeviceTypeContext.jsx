import { createContext, useContext, useState, useEffect } from 'react'

const DeviceTypeContext = createContext()

export const DeviceTypeProvider = ({ children }) => {
    const [deviceType, setDeviceType] = useState(
        getDeviceType(window.innerWidth))

    function getDeviceType(width) {
        if (width <= 480) return 'mobile'
        else if (width <= 600) return 'mini-tablet'
        else if (width <= 900) return 'tablet'
        return 'desktop'
    }

    useEffect(() => {
        const handleResize = () => {
            setDeviceType(getDeviceType(window.innerWidth))
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <DeviceTypeContext.Provider value={deviceType}>
            {children}
        </DeviceTypeContext.Provider>
    )
}

export const useDeviceType = () => {
    const context = useContext(DeviceTypeContext)
    if (!context) {
        throw new Error('useDeviceType must be used within a DeviceTypeProvider')
    }
    return context
}