import { useRef } from 'react'
import outsideClick from '../customHooks/outsideClick.js'

export function SmileyChoice({ setMessage, setSmileyChoice }) {
  const closeRef = useRef(null)
  const smileys = [
    '😊', '😄', '😍', '😎', '🤗', '😇', '🤩', '😜', '😂', '🥳',
    '😀', '😃', '😆', '😁', '😅', '😂', '🤣', '😇', '😉', '😊',
    '😋', '😌', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩',
    '👍', '👎', '👌', '👊', '✊', '🤞', '🤘', '🤙', '🤝', '🤚',
    '💪', '👏', '🙌', '👐', '🤲', '🙏', '🤞', '✌️', '🤟', '🤝',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💔',
    '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️', '❣️',
    '💌', '💤', '💢', '💣', '💥', '💫', '💦', '💨', '💧', '💩',
  
  ]

  const insertSmiley = (smiley) => {
    setMessage((prevMessage) => prevMessage + smiley)
  }

  outsideClick(closeRef, () => {
    setSmileyChoice((prevState) => !prevState)
  })

  return (
    <ul className="smiley-choice" ref={closeRef}>
      {smileys.map((smiley, index) => (
        <li key={index} onClick={() => insertSmiley(smiley)}>
          {smiley}
        </li>
      ))}
    </ul>
  )
}
