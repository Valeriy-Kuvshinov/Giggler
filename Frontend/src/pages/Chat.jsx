import { useSelector } from 'react-redux'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

import { useEffect, useState } from 'react'
import { clearChats, loadChats, removeChat } from '../store/chat.actions.js'

import { UserChat } from '../cmps/UserChat.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { Loader } from '../cmps/Loader.jsx'
import SvgIcon from '../cmps/SvgIcon.jsx'

export function Chat({ onFooterUpdate }) {
  const isLoading = useSelector((storeState) => storeState.chatModule.isLoading)
  const chats = useSelector((storeState) => storeState.chatModule.chats)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const deviceType = useDeviceType()
  const [chatState, setChatState] = useState(false)
  const [chatProps, setChatProps] = useState(null)
  const isFrom = 'chatPage'
  // console.log(chats)

  useEffect(() => {
    if (chats.length < 1) chatsLoading()
    return () => clearChats()
  }, [])

  async function chatsLoading() {
    try {
      await loadChats({ userId: loggedinUser._id })
    } catch (err) {
      console.log("Couldn't load chats:", err)
    }
  }

  useEffect(() => {
    if (!isLoading) onFooterUpdate()
  }, [isLoading, onFooterUpdate])

  async function onRemoveChat(event, chatId) {
    event.stopPropagation()
    try {
      await removeChat(chatId)
    } catch (err) {
      console.log('Unable to erase chat: ', err)
    }
  }

  function goBack(event) {
    event.preventDefault()
  }

  function onOpenChat(props) {
    setChatProps(props)
    setChatState(true)
  }

  return (
    <main
      className={`chats-page layout-row ${deviceType} grid`}
    >
      <main className="chats-nav">
        <section className="chat-header b">
          <span>Chat</span>{' '}
          {deviceType === 'mobile' && (
            <span onClick={(event) => goBack(event)}>
              <SvgIcon iconName={'remove'} />
            </span>
          )}
        </section>
        {isLoading ? (
          <Loader />
        ) : chats && chats.length > 0 ? (
          <ul className="chat-body">
            <>
              {chats.map((chat) => {
                const { buyer, seller } = chat
                const role =
                  loggedinUser._id === chat.gig.ownerId ? 'buyer' : 'seller'
                return (
                  <li
                    className="chat-container"
                    key={chat._id}
                    onClick={() =>
                      onOpenChat({
                        owner: seller,
                        buyer: buyer,
                        gig: chat.gig,
                      })
                    }
                  >
                    <img src={chat[role].imgUrl} alt="buyer img" />
                    <div className="chat-info">
                      <div className="user-info flex">
                        <span className="name-wrapper">
                          <span className="name">{chat[role].fullName}</span>
                          <span className="username">
                            @{chat[role].username}
                          </span>
                        </span>
                        <span className="time">
                          {new Intl.DateTimeFormat('en-US', {
                            month: 'short',
                            day: 'numeric',
                          }).format(
                            chat.messages[chat.messages.length - 1].time
                          )}
                        </span>
                      </div>
                      <div className="last-msg">
                        {chat.messages[chat.messages.length - 1].message}
                      </div>
                    </div>
                    <span
                      onClick={(event) => onRemoveChat(event, chat._id)}
                      className="erase-chat"
                    >
                      <SvgIcon iconName={'deny'} />
                    </span>
                  </li>
                )
              })}
            </>
          </ul>
        ) : (
          <div>You have no chats opened</div>
        )}
        {chatProps && chatState && deviceType === 'mobile' && (
          <UserChat
            owner={chatProps.owner}
            chatState={chatState}
            setChatState={setChatState}
            buyer={chatProps.buyer}
            gig={chatProps.gig}
          />
        )}
      </main>
      {!chatState && (
        <div className="unselected-chat">
          <div className="info-message">
            <img src="https://res.cloudinary.com/dgwgcf6mk/image/upload/v1702205415/Giggler/other/no-conversations.7ea0e44_hjntyr.svg" />
            <span className="title">You haven’t selected a chat</span>
            <span className="subtitle">
              Please select a chat to continue a conversation
            </span>
          </div>
        </div>
      )}
      {!chats && (
        <div className="unselected-chat">
          <div className="info-message">
            <img src="https://res.cloudinary.com/dgwgcf6mk/image/upload/v1702205415/Giggler/other/no-conversations.7ea0e44_hjntyr.svg" />
            <span className="title">Ah, a fresh new inbox</span>
            <span className="subtitle">
              You haven’t started any conversations yet, but when you do, you’ll find them here.
            </span>
          </div>
        </div>
      )}
      {chatProps && chatState && deviceType !== 'mobile' && (
        <UserChat
          owner={chatProps.owner}
          chatState={chatState}
          setChatState={setChatState}
          buyer={chatProps.buyer}
          gig={chatProps.gig}
          isFrom={isFrom}
        />
      )}

      {deviceType === 'desktop' && chatProps && (
        <UserInfo watchedUser={loggedinUser._id === chatProps.gig.ownerId ? chatProps.buyer : chatProps.owner} />
      )}
    </main>
  )
}
