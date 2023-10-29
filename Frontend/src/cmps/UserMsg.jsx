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
import { eventBusService } from "../services/event-bus.service.js"
import { useState, useEffect } from 'react'

import SvgIcon from "./SvgIcon.jsx"

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [isSlidingOut, setIsSlidingOut] = useState(false)

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', data => {
      const { title, body, type, styles } = data
      setMsg({ title, body, type, styles })

      setIsActive(true)
      setTimeout(() => {
        setIsActive(false)
        setIsSlidingOut(true)
        setTimeout(onCloseMsg, 500)
      }, 600000)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  function onCloseMsg() {
    setIsSlidingOut(false)
    setMsg(null)
  }

  if (!msg) return null

  const { title, body, type, styles } = msg
  const svgIconName = type === 'success' ? 'success' : 'error'

  return (
    <section className={`user-msg ${isActive ? 'slide-in' : ''} ${isSlidingOut ? 'slide-out' : ''} ${type}`}
      style={{ left: styles?.userMsgLeft }}>
      <div className={`message-area flex column ${type}`} style={{ padding: styles?.messageAreaPadding }}>
        <div className={`msg-status flex row ${type}`} style={{ transform: `translateX(${styles?.msgStatusTranslateX})` }}>
          <SvgIcon iconName={svgIconName} />
          <p>{`${svgIconName}!`}</p>
        </div>
        <h3 className={type}>{title}</h3>
        <p>{body}</p>
      </div>
    </section>
  )
}