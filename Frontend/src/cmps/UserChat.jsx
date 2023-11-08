import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { socketService } from '../services/socket.service'
import { useModal } from '../customHooks/ModalContext.jsx'
import SvgIcon from './SvgIcon.jsx'
import { utilService } from '../services/util.service.js'
import { TypingLoader } from './TypingLoader.jsx'

export function UserChat({ owner, window, chatState, setChatState, buyer }) {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const { openLogin } = useModal()
  const [typingUser, setTypingUser] = useState('')
  const [characterCount, setCharacterCount] = useState(0)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const timeoutId = useRef(null)
  let isBuyer = loggedinUser && owner._id !== loggedinUser._id

  useEffect(() => {
    if (chatState) {
      if (loggedinUser && owner._id !== loggedinUser._id) openChatWithSeller()

      socketService.on('chat_add_msg', addMessage)
      socketService.on('chat_add_typing', addTypingUser)
      socketService.on('chat_remove_typing', removeTypingUser)
    }

    return () => {
      socketService.off('chat_add_msg', addMessage)
      socketService.off('chat_add_typing', addTypingUser)
      socketService.off('chat_remove_typing', removeTypingUser)
      clearTimeout(timeoutId.current)
    }
  }, [chatState])

  function openChatWithSeller() {
    console.log('im in openChatWithSeller ')
    socketService.emit('chat_open', {
      sellerId: owner._id,
      buyer: loggedinUser,
    })
  }

  function addMessage(msg) {
    console.log('msg: ', msg)
    setMessages((prevMessage) => [...prevMessage, msg])
  }

  function addTypingUser(user) {
    setTypingUser(user)
  }

  function removeTypingUser() {
    setTypingUser(null)
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }
  function handleSendMessage() {
    const newMessage = {
      message: message,
      time: new Date(),
      user: loggedinUser,
    }
    isBuyer = loggedinUser && owner._id !== loggedinUser._id
    if (isBuyer) {
      socketService.emit('chat-send-msg', { userId: owner._id, newMessage })
      // socketService.emit('chat_stop_typing', {userId: owner._id})
    } else {
      socketService.emit('chat-send-msg', { userId: buyer._id, newMessage })
      // socketService.emit('chat_stop_typing', {userId: buyer._id})
    }

    setMessages((prevMessage) => [...prevMessage, newMessage])
    clearTimeout(timeoutId.current)
    timeoutId.current = null
    setMessage('')
    socketService.emit('chat-stop-typing', isBuyer ? owner : buyer)
  }

  function onChangeMessage(event) {
    const messageText = event.target.value
    setCharacterCount(messageText.length)
    setMessage(messageText)

    isBuyer = loggedinUser && owner._id !== loggedinUser._id
    if (!timeoutId.current)
      socketService.emit('chat-user-typing', isBuyer ? owner : buyer)
    if (timeoutId.current) clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      socketService.emit('chat-stop-typing', isBuyer ? owner : buyer)
      timeoutId.current = null
    }, 2000)
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
      )}

      {chatState && (
        <div className="chat-box-wrapper">
          <aside className="chat-box">
            <div className="chat-box-container">
              <section className="user-info-bar">
                <div className="avatar">
                  {buyer ? (
                    <img src={buyer.imgUrl} alt={buyer.username} />
                  ) : (
                    <img src={owner.imgUrl} alt={owner.username} />
                  )}
                  <span className="status-dot"></span>
                </div>
                <div className="owner-info">
                  <span>
                    {buyer ? (
                      <span className="message">{`Message ${buyer.username}`}</span>
                    ) : (
                      <span className="message">{`Message ${owner.username}`}</span>
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
                  <div className="message-container">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={
                          message.user._id === loggedinUser._id
                            ? 'you message'
                            : 'other message'
                        }
                      >
                        <div className="message-info">
                          <span className="avatar">
                            <img
                              src={message.user.imgUrl}
                              alt={message.user.username}
                            />
                          </span>
                          <span className="message-username">
                            {message.user._id === loggedinUser._id
                              ? 'You'
                              : message.user.username}
                          </span>
                          {/* <span className="message-timestamp">
                          {utilService.timeAgoString(message.time)}
                        </span> */}
                        </div>
                        <div className="message-text">{message.message}</div>
                      </div>
                    ))}
                    {typingUser && (
                      <>
                        <div className="other message">
                          <div className="message-info">
                            <span className="avatar">
                              <img
                                src={
                                  loggedinUser._id === owner._id
                                    ? owner.imgUrl
                                    : loggedinUser.imgUrl
                                }
                                alt={
                                  loggedinUser._id === owner._id
                                    ? owner.imgUrl
                                    : loggedinUser.imgUrl
                                }
                              />
                            </span>
                            <span className="message-username">
                              {isBuyer ? owner.username : buyer.username}
                            </span>
                          </div>
                          <div className="message-text" style={{ border: 0 , margin: '0 .5em'}}>
                            <TypingLoader />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="input-container">
                    <textarea
                      maxLength="2500"
                      data-testid="message-box"
                      placeholder={
                        isBuyer
                          ? `Ask ${owner.username} a question or share your project details (requirements, timeline, budget, etc.)`
                          : `Sell you gig...`
                      }
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
                          Do you think you can deliver an order by...tomorrow at
                          10pm
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
                    onKeyPress={handleKeyPress}
                  >
                    <SvgIcon iconName={'send'} />
                    <span>Send message</span>
                  </button>
                </div>
              </section>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
