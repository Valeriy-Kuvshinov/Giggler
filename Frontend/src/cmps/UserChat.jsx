import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { socketService } from '../services/socket.service.js'

import SvgIcon from './SvgIcon.jsx'
import { SmileyChoice } from './SmileyChoice.jsx'
import {
  getChatByUsers,
  saveChat,
  loadNewMsg,
  loadIsTyping,
  removeIsTyping,
  getChat,
  loadEmptyChat,
  clearCurrChat,
} from '../store/chat.actions.js'
import { Loader } from './Loader.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

export function UserChat({
  owner,
  chatState,
  setChatState,
  buyer,
  gig,
  isFrom,
}) {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const currentChat = useSelector(
    (storeState) => storeState.chatModule.currentChat
  )
  const { isTyping } = useSelector((storeState) => storeState.chatModule)
  const isLoading = useSelector((storeState) => storeState.chatModule.isLoading)
  const isBuyer = loggedinUser && owner._id !== loggedinUser._id

  const [characterCount, setCharacterCount] = useState(0)
  const [message, setMessage] = useState('')
  const [smileyChoice, setSmileyChoice] = useState(false)
  const timeoutId = useRef(null)
  const chatContainerRef = useRef(null)
  const deviceType = useDeviceType()

  useEffect(() => {
    loadsChat()
    autoScroll()
  }, [owner, loggedinUser])

  async function loadsChat() {
    let newChat
    try {
      newChat = await getChatByUsers({
        sellerId: owner._id,
        buyerId: buyer._id,
      })
    } catch (err) {
      console.log('Problem occurred whe getting new chat: ', err)
    } finally {
      if (!currentChat) {
        loadEmptyChat({
          seller: owner,
          buyer: isBuyer ? loggedinUser : buyer,
          messages: [],
          gig: gig,
        })
      }
    }
  }

  useEffect(() => {
    socketService.on('chat_add_msg', addMessage)
    socketService.on('chat_add_typing', addTypingUser)
    socketService.on('chat_remove_typing', removeTypingUser)

    return () => {
      socketService.off('chat_add_msg', addMessage)
      socketService.off('chat_add_typing', addTypingUser)
      socketService.off('chat_remove_typing', removeTypingUser)
      clearTimeout(timeoutId.current)
      setChatState(false)
      clearCurrChat()
    }
  }, [])

  function addMessage(message) {
    loadNewMsg(message)
    autoScroll()
  }

  function addTypingUser(user) {
    loadIsTyping(user)
    autoScroll()
  }

  function removeTypingUser(userToRemove) {
    removeIsTyping(userToRemove)
  }

  function autoScroll() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }
  async function handleSendMessage() {
    const newMessage = {
      message: message,
      time: Date.now(),
      user: loggedinUser,
    }
    setMessage('')

    if (isBuyer) {
      socketService.emit('chat-send-msg', { userId: owner._id, newMessage })
    } else {
      socketService.emit('chat-send-msg', { userId: buyer._id, newMessage })
    }

    try {
      if (currentChat?.messages?.length) {
        await saveChat({
          ...currentChat,
          messages: [...currentChat.messages, newMessage],
        })
      } else {
        await saveChat({
          buyer: loggedinUser,
          seller: owner,
          messages: [newMessage],
          gig: gig,
        })
      }
    } catch (err) {
      console.log('Unable to save or update chat:', err)
    }

    clearTimeout(timeoutId.current)
    timeoutId.current = null
    socketService.emit('chat-stop-typing', {
      typingUser: loggedinUser,
      receiverId: isBuyer ? owner._id : buyer._id,
    })
    setCharacterCount(0)
    autoScroll()
  }

  function onChangeMessage(event) {
    const messageText = event.target.value
    setCharacterCount(messageText.length)
    setMessage(messageText)

    if (!timeoutId.current)
      socketService.emit('chat-user-typing', {
        typingUser: loggedinUser,
        receiverId: isBuyer ? owner._id : buyer._id,
      })

    if (timeoutId.current) clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      socketService.emit('chat-stop-typing', {
        typingUser: loggedinUser,
        receiverId: isBuyer ? owner._id : buyer._id,
      })
      timeoutId.current = null
    }, 2000)
  }

  if (currentChat === undefined || currentChat === null) return <Loader />
  //   return <Loader />
  // if (isLoading) return <Loader />

  return (
    <>
      {chatState && (
        <div
          className={`chat-box-wrapper ${
            isFrom === 'chatPage' ? 'chat-page' : ''
          }`}
        >
          <aside
            className={`chat-box ${isFrom === 'chatPage' ? 'chat-page' : ''}`}
          >
            <section className="user-info-bar flex row">
              <div className="avatar">
                {buyer ? (
                  <img src={owner.imgUrl} alt={owner.username} />
                ) : (
                  <img src={buyer.imgUrl} alt={buyer.username} />
                )}
                <span className="status-dot"></span>
              </div>
              <div className="owner-info flex">
                <span>
                  {buyer ? (
                    <span className="message flex row">{`Message ${owner.username}`}</span>
                  ) : (
                    <span className="message flex row">{`Message ${buyer.username}`}</span>
                  )}
                  <span className="response-time flex">
                    <span>Online</span>
                    <span className="dot flex"></span>
                    <span>
                      Avg. response time: <span className="b">1 Hour</span>
                    </span>
                  </span>
                </span>
                {isFrom !== 'chatPage' && (
                  <span className="remove" onClick={() => setChatState(false)}>
                    <SvgIcon iconName={'remove'} />
                  </span>
                )}
              </div>
            </section>
            <div className="chat-box-container grid">
              <section className="chat-container grid">
                <div className="message-form grid">
                  <div
                    className={`message-container flex column ${
                      isFrom === 'chatPage' ? 'chat-page' : ''
                    }`}
                    ref={chatContainerRef}
                  >
                    {currentChat.messages?.length > 0 &&
                      currentChat.messages.map((message, index) => {
                        return (
                          <div
                            key={index}
                            className={`message ${
                              message.user._id === loggedinUser._id
                                ? 'user-one'
                                : 'user-two'
                            } flex column`}
                          >
                            <div className="message-body grid">
                              <span className="text">{message.message}</span>
                              <img
                                className="avatar"
                                src={message.user.imgUrl}
                                alt={message.user.username}
                              />
                            </div>
                          </div>
                        )
                      })}

                    {isTyping.length > 0 &&
                      isTyping.map((user, index) => (
                        <div
                          key={index}
                          className={`message ${
                            user._id === loggedinUser._id
                              ? 'user-one'
                              : 'user-two'
                          } flex column`}
                        >
                          <div className="message-body grid">
                            <span className="text">
                              <span className="typing-loader">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                              </span>
                            </span>
                            <img
                              className="avatar"
                              src={user.imgUrl}
                              alt={user.username}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <footer className="chat-footer grid">
                  <div className="input-container">
                    <textarea
                      maxLength="2500"
                      data-testid="message-box"
                      placeholder={
                        isBuyer
                          ? `Ask ${owner.username} a question about the gig!`
                          : `Sell your gig...`
                      }
                      value={message}
                      onChange={(e) => onChangeMessage(e)}
                      onKeyPress={handleKeyPress}
                    ></textarea>
                  </div>

                  <div
                    className="message-footer-wrapper"
                    data-testid="message-wrapper"
                  >
                    {isBuyer && !currentChat.messages?.length && (
                      <section className="quick-question-container flex column">
                        <button
                          onClick={() => {
                            const newMessage = `👋 Hey ${owner.username}, can you help me with...`
                            setMessage(newMessage)
                            setCharacterCount(newMessage.length)
                          }}
                        >
                          👋 Hey {owner.username}, can you help me with...
                        </button>
                        <button
                          onClick={() => {
                            const newMessage =
                              'Would it be possible to get a custom offer for...'
                            setMessage(newMessage)
                            setCharacterCount(newMessage.length)
                          }}
                        >
                          Would it be possible to get a custom offer for...
                        </button>
                        <button
                          onClick={() => {
                            const newMessage =
                              'Do you think you can deliver an order by...'
                            setMessage(newMessage)
                            setCharacterCount(newMessage.length)
                          }}
                        >
                          Do you think you can deliver an order by...
                        </button>
                      </section>
                    )}

                    <section className="char-count">
                      <span>{characterCount}/2500</span>
                    </section>
                  </div>
                  <div
                    className={`message-options flex row ${
                      isFrom === 'chatPage' ? 'chat-page' : ''
                    }`}
                  >
                    <span className="addition flex">
                      {deviceType !== 'mobile' && (
                        <span
                          className="smiley-container"
                          onClick={() =>
                            setSmileyChoice((prevState) => !prevState)
                          }
                        >
                          <SvgIcon iconName={'smiley'} />
                          {smileyChoice && (
                            <SmileyChoice
                              setMessage={setMessage}
                              setSmileyChoice={setSmileyChoice}
                            />
                          )}
                        </span>
                      )}
                      <button>
                        <SvgIcon iconName={'loadingFiles'} />
                      </button>
                    </span>

                    <button
                      className="send-message-button flex row"
                      disabled={!message}
                      onClick={handleSendMessage}
                    >
                      <SvgIcon iconName={'send'} />
                      <span>Send message</span>
                    </button>
                  </div>
                </footer>
              </section>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
