export function SmileyChoice({ message, setMessage }) {
    const smileys = [
        '😊', '😄', '😍', '😎', '🤗', '😇', '🤩', '😜', '😂', '🥳',
        '😀', '😃', '😆', '😁', '😅', '😂', '🤣', '😇', '😉', '😊',
        '😋', '😌', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩',
       
      ]

  const insertSmiley = (smiley) => {
    setMessage((prevMessage) => prevMessage + smiley)
  }

  return (
    <ul className="smiley-choice">
      {smileys.map((smiley, index) => (
        <li key={index} onClick={() => insertSmiley(smiley)}>
          {smiley}
        </li>
      ))}
    </ul>
  )
}
