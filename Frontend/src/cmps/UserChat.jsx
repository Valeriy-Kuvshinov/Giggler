import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'

import SvgIcon from './SvgIcon.jsx'
import { socket } from '../services/sockets.service.js'

export function UserChat({
  owner,
  window,
  chatState,
  setChatState,
  newRoom: chatRoom,
  buyer,
}) {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const { openLogin } = useModal()

  const [characterCount, setCharacterCount] = useState(0)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState(() => {
    chatRoom ? chatRoom : ''
  })

  console.log(`this is ${owner.username} with the buyer: ${buyer}`)

  useEffect(() => {
    if (loggedinUser && owner._id !== loggedinUser._id) openChatWithSeller()
    else openChatWithBuyer()

    return () => {
      socket.disconnect()
    }
  }, [])

  function openChatWithSeller() {
    const theRoom = `${loggedinUser._id}-${owner._id}`
    setRoom(theRoom)
    socket.emit('chat_request', {
      sellerId: owner._id,
      buyer: loggedinUser,
      room: theRoom,
    })
  }

  function openChatWithBuyer() {
    if (!room) {
      console.log('Room in userChat is messed up!: ', room)
      return
    }
    socket.emit('chat_request', {
      sellerId: owner._id,
      buyerId: loggedinUser._id,
      room,
    })
  }

  useEffect(() => {
    if (socket) {
      socket.on('new_message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data.message])
      })
    }
  }, [socket])

  function handleSendMessage() {
    if (socket && message.trim() !== '') {
      socket.emit('send_message', { room, message })
      setMessage('')

      const newMessage = {
        message: message,
        time: new Date(),
        username: loggedinUser.username,
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }
  }

  function onChangeMessage(event) {
    const messageText = event.target.value
    setCharacterCount(messageText.length)
    setMessage(messageText)
  }

  return (
    <>
      {!chatState && (
        <section
          onClick={() => {
            if (loggedinUser) setChatState(true)
            else openLogin()
          }}
          className="mini-message-bar"
        >
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
              <span className="message">{`Message${window ? '' : ` ${owner.fullName}`
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
      )}

      {chatState && (
        <aside className="chat-box">
          <div className="chat-box-container">
            <section className="user-info-bar">
              <div className="avatar">
                {owner._id === loggedinUser ? (
                  <img src={buyer.imgUrl} alt={buyer.username} />
                ) : (
                  <img src={owner.imgUrl} alt={owner.username} />
                )}
                <span className="status-dot"></span>
              </div>
              <div className="owner-info">
                <span>
                  {owner._id === loggedinUser ? (
                    <span className="message">{`Message ${buyer.fullName}`}</span>
                  ) : (
                    <span className="message">{`Message ${owner.fullName}`}</span>
                  )}
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
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.username === owner.username
                        ? 'message outgoing'
                        : 'message incoming'
                    }
                  >
                    <div className="message-text">{message.message}</div>
                    <div className="message-info">
                      <span className="message-username">
                        {message.username}
                      </span>
                      <span className="message-timestamp">
                        {new Date(message.time).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="input-container">
                  <textarea
                    maxLength="2500"
                    data-testid="message-box"
                    placeholder={`Ask ${owner.username} a question or share your project details (requirements, timeline, budget, etc.)`}
                    value={message}
                    onChange={(e) => onChangeMessage(e)}
                  ></textarea>
                </div>

                <div
                  className="message-footer-wrapper"
                  data-testid="message-wrapper"
                >
                  {!message && !buyer && (
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
                  )}

                  <footer className="message-footer">
                    <section className="character-count">
                      <span className="count">{characterCount}/2500</span>
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
