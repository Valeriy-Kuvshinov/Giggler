import { eventBusService } from "../services/event-bus.service.js"
import { useState, useEffect } from 'react'

// export function UserMsg() {
//   const [msg, setMsg] = useState(null)
//   const timeoutIdRef = useRef()

//   useEffect(() => {
//     const unsubscribe = eventBus.on('show-msg', (msg) => {
//       setMsg(msg)
//       window.scrollTo({ top: 0, behavior: 'smooth' })

//       if (timeoutIdRef.current) {
//         timeoutIdRef.current = null
//         clearTimeout(timeoutIdRef.current)
//       }
//       timeoutIdRef.current = setTimeout(closeMsg, 3000)
//     })

//     socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//       showSuccessMsg(`New review about me ${review.txt}`)
//     })

//     return () => {
//       unsubscribe()
//       socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
//     }
//   }, [])

//   function closeMsg() {
//     setMsg(null)
//   }

//   if (!msg) return <span></span>

//   return (
//     <section className={`user-msg ${msg.type}`}>
//       <button onClick={closeMsg}>x</button>
//       {msg.txt}
//     </section>
//   )
// }
export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', newMsg => {
      setMsg(newMsg)
      setIsActive(true)
      setTimeout(() => {
        setIsActive(false)
        setTimeout(onCloseMsg, 800)
      }, 2500)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  function onCloseMsg() {
    setMsg(null)
  }

  if (!msg) return null

  return (
    <section className={`user-msg ${msg.type} ${isActive ? 'active' : ''}`}>
      <p>{msg.txt}</p>
    </section>
  )
}