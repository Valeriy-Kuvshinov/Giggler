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
import {
  eventBusService,
  showErrorMsg,
  showSuccessMsg,
} from '../services/event-bus.service.js'
import { useState, useEffect } from 'react'

import SvgIcon from './SvgIcon.jsx'
import { socketService } from '../services/socket.service.js'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [isSlidingOut, setIsSlidingOut] = useState(false)

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (data) => {
      const { title, body, type, styles } = data
      setMsg({ title, body, type, styles })

      setIsActive(true)
      setTimeout(() => {
        setIsActive(false)
        setIsSlidingOut(true)
        setTimeout(onCloseMsg, 500)
      }, 8000)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    socketService.on('notify-buyer-accepted', orderAcceptedNotification)
    socketService.on('notify-buyer-denied', orderDeniedNotification)
    socketService.on('notify-buyer-completed', orderCompletedNotification)
    socketService.on('notify-seller-new-order', newOrderNotification)
    return () => {
      socketService.off('notify-buyer-accepted', orderAcceptedNotification)
      socketService.off('notify-buyer-denied', orderDeniedNotification)
      socketService.off('notify-buyer-completed', orderCompletedNotification)
      socketService.off('notify-seller-new-order', newOrderNotification)
    }
  }, [])

  function orderAcceptedNotification(user) {
    showSuccessMsg(
      {
        title: 'ORDER ACCEPTED',
        body: `${user.username} has accepted your order!`,
      },
      {
        userMsgLeft: '55%',
        messageAreaPadding: '2em 1.5em 2em 7em',
        msgStatusTranslateX: '-12em',
      }
    )
  }
  function orderDeniedNotification(user) {
    showErrorMsg(
      {
        title: 'ORDER DENIED',
        body: `${user.username} has rejected your order!`,
      },
      {
        userMsgLeft: '55%',
        messageAreaPadding: '2em 1.5em 2em 7em',
        msgStatusTranslateX: '-12em',
      }
    )
  }
  function orderCompletedNotification(user) {
    showSuccessMsg(
      {
        title: 'ORDER COMPLETED',
        body: `${user.username} has completed your order!`,
      },
      {
        userMsgLeft: '55%',
        messageAreaPadding: '2em 1.5em 2em 7em',
        msgStatusTranslateX: '-12em',
      }
    )
  }
  function newOrderNotification(user) {
    showSuccessMsg(
      {
        title: 'NEW ORDER',
        body: `${user.username} just purchased a gig from you!`,
      },
      {
        userMsgLeft: '55%',
        messageAreaPadding: '2em 1.5em 2em 7em',
        msgStatusTranslateX: '-12em',
      }
    )
  }

  function onCloseMsg() {
    setIsSlidingOut(false)
    setMsg(null)
  }

  if (!msg) return null

  const { title, body, type, styles } = msg
  const svgIconName = type === 'success' ? 'success' : 'error'

  return (
    <section
      className={`user-msg ${isActive ? 'slide-in' : ''} ${
        isSlidingOut ? 'slide-out' : ''
      } ${type}`}
      style={{ left: styles?.userMsgLeft }}
    >
      <div
        className={`message-area flex column ${type}`}
        style={{ padding: styles?.messageAreaPadding }}
      >
        <button className={type} onClick={onCloseMsg}>
          <SvgIcon iconName={'remove'} />
        </button>

        <div
          className={`msg-status flex row ${type}`}
          style={{ transform: `translateX(${styles?.msgStatusTranslateX})` }}
        >
          <SvgIcon iconName={svgIconName} />

          <p>{`${svgIconName}!`}</p>
        </div>
        <h3 className={type}>{title}</h3>

        <p>{body}</p>
      </div>
    </section>
  )
}
