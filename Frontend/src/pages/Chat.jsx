import { useSelector } from 'react-redux'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

import { useEffect, useState } from 'react'
import { clearChats, loadChats, removeChat } from '../store/chat.actions.js'

import { UserChat } from '../cmps/UserChat.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { Loader } from '../cmps/Loader.jsx'
import SvgIcon from '../cmps/SvgIcon.jsx'

export function Chat() {
  const isLoading = useSelector((storeState) => storeState.chatModule.isLoading)
  const chats = useSelector((storeState) => storeState.chatModule.chats)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const deviceType = useDeviceType()
  const [chatState, setChatState] = useState(false)
  const [chatProps, setChatProps] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)

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
    socketService.on('chat_add_msg', newMsgNotification)

    return () => socketService.off('chat_add_msg', newMsgNotification)
  }, [])

  async function onRemoveChat(event, chatId) {
    event.stopPropagation()
    try {
      await removeChat(chatId)
    } catch (err) {
      console.log('Unable to erase chat: ', err)
    }
  }

  function onOpenChat(props) {
    setChatProps(props)
    setChatState(true)
  }

  function newMsgNotification(msg) {
    // chatsLoading()
    setNotificationMsg(msg)
  }

  return (
    <main className={`chats-page layout-row ${deviceType} grid`}>
      <main className="chats-nav">
        <section className="chat-header b">
          <span>Chat</span>{' '}
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
                    className={`chat-container flex`}
                    key={chat._id}
                    onClick={() => {
                      onOpenChat({
                        owner: seller,
                        buyer: buyer,
                        gig: chat.gig,
                      })
                      setNotificationMsg('')
                    }}
                  >
                    <div
                      className={`userImg ${notificationMsg?.user?._id === chat[role]._id
                        ? 'notification' : ''}`}
                    >
                      <img src={chat[role].imgUrl} alt="buyer img" />
                    </div>
                    <div className="chat-info flex column">
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
                      <div className="bottom-chat-line grid">
                        <span className="latest-message">
                          {notificationMsg?.user?._id === chat[role]._id
                            ? notificationMsg.message
                            : chat.messages[chat.messages.length - 1].message}
                        </span>
                        <span
                          onClick={(event) => onRemoveChat(event, chat._id)}
                          className="erase-chat flex"
                        >
                          <SvgIcon iconName={'trashIcon'} />
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </>
          </ul>
        ) : (
          <div>You have no chats opened</div>
        )}
        {chatProps &&
          chatState &&
          (deviceType === 'mobile' || deviceType === 'mini-tablet') && (
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
          <div className="info-message flex column">
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
          <div className="info-message flex column">
            <img src="https://res.cloudinary.com/dgwgcf6mk/image/upload/v1702205415/Giggler/other/no-conversations.7ea0e44_hjntyr.svg" />
            <span className="title">Ah, a fresh new inbox</span>
            <span className="subtitle">
              You haven’t started any conversations yet, but when you do, you’ll
              find them here.
            </span>
          </div>
        </div>
      )}
      {chatProps &&
        chatState &&
        (deviceType === 'tablet' || deviceType === 'desktop') && (
          <UserChat
            owner={chatProps.owner}
            chatState={chatState}
            setChatState={setChatState}
            buyer={chatProps.buyer}
            gig={chatProps.gig}
            isFrom={'chatPage'}
          />
        )}

      {deviceType === 'desktop' && chatProps && (
        <UserInfo
          watchedUser={
            loggedinUser._id === chatProps.gig.ownerId
              ? chatProps.buyer
              : chatProps.owner
          }
        />
      )}
    </main>
  )
}
