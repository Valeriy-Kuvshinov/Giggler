import { useSelector } from 'react-redux'
import SvgIcon from '../cmps/SvgIcon'
import { Loader } from '../cmps/Loader'
import { useEffect, useState } from 'react'
import { embedUsersOnChat, loadChats, removeChat } from '../store/chat.actions'
import { UserChat } from '../cmps/UserChat'
import { useDeviceType } from '../customHooks/DeviceTypeContext'
// import { useHistory } from 'react-router-dom'

export function Chat() {
  const isLoading = useSelector((storeState) => storeState.chatModule.isLoading)
  const chats = useSelector((storeState) => storeState.chatModule.chats)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const deviceType = useDeviceType()
  const [chatState, setChatState] = useState(true)
  const [chatProps, setChatProps] = useState(null)
  const isFrom = 'chatPage'
  // console.log(chats)
  useEffect(() => {
    if (chats.length < 1) chatsLoading()
  }, [])

  async function chatsLoading() {
    try {
      await loadChats({ userId: loggedinUser._id })
    } catch (err) {
      console.log("Couldn't load chats:", err)
    }
  }

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
    // history.goBack()
  }

  function onOpenChat(props) {
    setChatProps(props)
    setChatState(true)
  }

  // if(chats.length < 1) return <Loader />

  return (
    <main
      className={`chats layout-row ${deviceType === 'desktop' ? 'desk' : ''}`}
    >
      <main className="chats-nav">
        <section className="chat-header b">
          <span>Chat</span>{' '}
         {deviceType === 'mobile' && <span onClick={(event) => goBack(event)}>
            <SvgIcon iconName={'remove'} />
          </span>}
        </section>
        <ul className="chat-body">
          {chats.length ? (
            <>
              {chats.map((chat, index) => {
                const { buyer, seller } = chat
                const role =
                  loggedinUser._id === chat.gig.ownerId ? 'buyer' : 'seller'
                // if (index === 0 && deviceType !== 'mobile') {
                //   onOpenChat({
                //     owner: seller,
                //     buyer: buyer,
                //     gig: chat.gig,
                //   })
                // }
                return (
                  <li
                    key={chat._id}
                    onClick={() =>
                      onOpenChat({
                        owner: seller,
                        buyer: buyer,
                        gig: chat.gig,
                      })
                    }
                    className="chat"
                  >
                    <img src={chat[role].imgUrl} alt="buyer img" />
                    <div className="chat-info">
                      <div className="user-info">
                        <span className="name-wrapper">
                          <span className="name">{buyer.fullName}</span>
                          <span className="username">
                            @{chat[role].username}
                          </span>
                        </span>
                        <span className="time">
                          {new Intl.DateTimeFormat('en-US', {
                            month: 'long',
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
          ) : (
            <div>You have no chats opened</div>
          )}
        </ul>
        {console.log('chatState: ' ,chatState)}
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
      {chatProps===null && (
      <div className='unselected-chat'>
        <div className='info-message'>
        <img src='https://res.cloudinary.com/dgwgcf6mk/image/upload/v1702205415/Giggler/other/no-conversations.7ea0e44_hjntyr.svg'/>
        <span className='title'>Ah, a fresh new inbox</span>
          <span className='subtitle'>You haven’t started any conversations yet, but when you do, you’ll find them here.</span>
        </div>
      </div>
      )}
      { !chats && (
      <div className='unselected-chat'>
        <div className='info-message'>
        <img src='https://res.cloudinary.com/dgwgcf6mk/image/upload/v1702205415/Giggler/other/no-conversations.7ea0e44_hjntyr.svg'/>
        <span className='title'>Ah, a fresh new inbox</span>
          <span className='subtitle'>You haven’t started any conversations yet, but when you do, you’ll find them here.</span>
        </div>
      </div>
      )}
      {chatProps && chatState && deviceType === 'desktop' && (
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
        <div>seller details</div>
      )}
    </main>)
}
