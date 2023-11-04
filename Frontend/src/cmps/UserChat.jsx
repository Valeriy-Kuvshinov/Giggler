import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import SvgIcon from './SvgIcon'

export function UserChat({ owner, window, chatState, setChatState }) {
  const [characterCount, setCharacterCount] = useState(0)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socket = io('http://localhost:5173/') // Replace with your server URL
    setSocket(socket)

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message])
      })
    }
  }, [socket])

  function handleSendMessage() {
    if (socket && message.trim() !== '') {
      socket.emit('message', { username: owner.username, text: message })
      setMessage('')

      const newMessage = {
        message: message,
        time: new Date(),
        username: owner.username,
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }
  }

  function onChangeMessage(event) {
    const messageText = event.target.value
    setCharacterCount(messageText.length)
    setMessage(messageText)
  }
  console.log('window: ', window)
  console.log('owner: ', owner)
  console.log('owner.imgUrl:', owner.imgUrl)
  return (
    <>
      <section onClick={() => setChatState(true)} className="mini-message-bar">
        <div className="mini-message-bar-container">
          <div
            style={{
              height: window ? '32px' : '48px',
              width: window ? '32px' : '48px',
            }}
            className="avatar"
          >
            <img src={owner.imgUrl} alt={owner.username} />
            <span
              style={{
                height: window ? '.65em' : '1em',
                width: window ? '.65em' : '1em',
              }}
              className="status-dot"
            ></span>
          </div>
          <div className="owner-info">
            <span className="message">{`Message${
              window ? '' : ` ${owner.fullName}`
            }`}</span>
            {!window && (
              <span className="response-time">
                <span>Online</span>
                <span className="dot"></span>
                <span>
                  Avg. response time: <span className="b">1 Hour</span>
                </span>
              </span>
            )}
          </div>
        </div>
      </section>

      {chatState && (
        <aside className="chat-box">
          <div className="chat-box-container">
            <section className="user-info-bar">
              <div className="avatar">
                <img src={owner.imgUrl} alt={owner.username} />
                <span className="status-dot"></span>
              </div>
              <div className="owner-info">
                <span>
                  <span className="message">{`Message ${owner.fullName}`}</span>
                  <span className="response-time">
                    <span>Online</span>
                    <span className="dot"></span>
                    <span>
                      Avg. response time: <span className="b">1 Hour</span>
                    </span>
                  </span>
                </span>
                <span className="remove" onClick={() => setChatState(false)}>
                  <SvgIcon iconName={'remove'} />
                </span>
              </div>
            </section>

            <section className="chat-container">
              <div className="message-form" data-testid="send-message-form">
                <div className="input-container">
                  <textarea
                    maxLength="2500"
                    data-testid="message-box"
                    placeholder={`Ask ${owner.username} a question or share your project details (requirements, timeline, budget, etc.)`}
                    value={message}
                    onChange={(e) => onChangeMessage(e)}
                  ></textarea>
                </div>

                <div className="message-footer-wrapper" data-testid="message-wrapper">
                  <section
                    className="quick-question-container"
                    data-testid="quick-questions-list"
                  >
                    <button
                      className="quick-question-btn"
                      onClick={() =>
                        setMessage(
                          `Hey ${owner.username}, can you help me with...`
                        )
                      }
                    >
                      👋 Hey {owner.username}, can you help me with...
                    </button>
                    <button
                      className="quick-question-btn"
                      onClick={() =>
                        setMessage(
                          'Would it be possible to get a custom offer for...'
                        )
                      }
                    >
                      Would it be possible to get a custom offer for...
                    </button>
                    <button
                      className="quick-question-btn"
                      onClick={() =>
                        setMessage(
                          'Do you think you can deliver an order by...'
                        )
                      }
                    >
                      Do you think you can deliver an order by...
                    </button>
                  </section>
                  {/* </div> */}
                  <footer className="message-footer">
                    <section className="character-count">
                      <span classNamwe="count">{characterCount}/2500</span>
                    </section>
                  </footer>
                </div>
              </div>
              <div className="message-options">
                <span className="addition-btn">
                  <span className="emoji-picker-icon">
                    <SvgIcon iconName={'smiley'} />
                    <div className="emoji-picker-container"></div>
                  </span>

                  <button className="file-upload-button">
                    <SvgIcon iconName={'loadingFiles'} />
                  </button>
                </span>

                <button
                  className="send-message-button"
                  disabled={!message}
                  onClick={handleSendMessage}
                >
                  <SvgIcon iconName={'send'} />
                  <span>Send message</span>
                </button>
              </div>
            </section>
          </div>
        </aside>
      )}
    </>
  )
}
