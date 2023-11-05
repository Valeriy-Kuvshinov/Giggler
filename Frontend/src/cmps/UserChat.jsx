import React, { useState, useEffect } from 'react'
import SvgIcon from './SvgIcon'
import { useSelector } from 'react-redux'
import { socketService } from '../services/socket.service'
export function UserChat({ owner, window, chatState, setChatState, buyer }) {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const [characterCount, setCharacterCount] = useState(0)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  // console.log(
  //   `this is owner.username: ${owner.username} with the buyer: ${buyer}`
  // )

  // console.log(`this is Messages in userChat ${messages}`)

  useEffect(() => {
    if (chatState) {
      if (loggedinUser && owner._id !== loggedinUser._id) openChatWithSeller()
      // else openChatWithBuyer()

      socketService.on('chat_add_msg', addMessage)
      socketService.on('chat_add_typing', addTypingUser)
      socketService.on('chat_remove_typing', removeTypingUser)
    }

    return () => {
      socketService.off('chat_add_msg', addMessage)
      socketService.off('chat_add_typing', addTypingUser)
      socketService.off('chat_remove_typing', removeTypingUser)
      // clearTimeout(timeoutId.current)
    }
  }, [chatState])

  function openChatWithSeller() {
    console.log('im in openChatWithSeller ')
    socketService.emit('chat_open', {
      sellerId: owner._id,
      buyer: loggedinUser,
    })
  }

  // function openChatWithBuyer() {

  //   socket.emit('chat_seller_enter', {
  //     room,
  //   })
  //   // console.log('im in openChatWithbuyer ')
  //   // socket.emit('chat-set-room', {
  //   //   sellerId: owner._id,
  //   //   buyer: loggedinUser,
  //   //   room,
  //   // })
  // }

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('new_message', (data) => {
  //       setMessages((prevMessages) => [...prevMessages, data.message])
  //     })
  //   }
  // }, [socket])
  function addMessage(msg) {
    const { newMessage } = msg
    console.log('new msg', newMessage)
    setMessages((prevMessage) => [...prevMessage, newMessage])
  }

  function addTypingUser(user) {
    setTypingUser(user)
  }

  function removeTypingUser() {
    setTypingUser(null)
  }
  // setMessages((prevMessages) => [...prevMessages, newMessage])

  function handleSendMessage() {
    const newMessage = {
      message: message,
      time: new Date(),
      username: loggedinUser.username,
    }
    if (loggedinUser && owner._id !== loggedinUser._id) {
      socketService.emit('chat-send-msg', { userId: owner._id, newMessage })
      // socketService.emit('chat_stop_typing', {userId: owner._id})
    } else {
      socketService.emit('chat-send-msg', { userId: buyer._id, newMessage })
      // socketService.emit('chat_stop_typing', {userId: buyer._id})
    }

    // clearTimeout(timeoutId.current)
    // timeoutId.current = null
    setMessage('')
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
          onClick={() => setChatState(true)}
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
