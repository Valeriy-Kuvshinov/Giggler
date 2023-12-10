import { useSelector } from 'react-redux'
import SvgIcon from '../cmps/SvgIcon'
import { Loader } from '../cmps/Loader'
import { useEffect, useState } from 'react'
import { clearChats, embedUsersOnChat, loadChats, removeChat } from '../store/chat.actions'
import { UserChat } from '../cmps/UserChat'
import { useDeviceType } from '../customHooks/DeviceTypeContext'
import { utilService } from '../services/util.service'
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

      return () => {
        clearChats()
      }
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

  //for side of chat

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  var time = 1
  if(chatProps){
    time = new Date(chatProps.owner.createdAt * 1000)
    var month = months[time.getMonth()]
    var year = time.getFullYear()
    var deliveredTime
    
    if (!chatProps.owner.lastDeliveredAt) deliveredTime = new Date(Date.now())
    else deliveredTime = new Date(chatProps.owner.lastDeliveredAt)

    var userLevel = ''
    if (chatProps.owner.level === 'level 0') userLevel = 'newuser'
    if (chatProps.owner.level === 'level 1') userLevel = 'level1'
    if (chatProps.owner.level === 'level 2') userLevel = 'level2'
    if (chatProps.owner.level === 'level 3') userLevel = 'topuser'

    var renderStars = () => {
      let fullStarsCount = Math.floor(chatProps.owner.rating)
      const isHalfStar = chatProps.owner.rating % 1 >= 0.5
  
      const stars = [...Array(fullStarsCount)].map((_, idx) => (
        <SvgIcon iconName={'star'} key={utilService.makeId()} />
      ))
  
      if (isHalfStar) {
        stars.push(<SvgIcon iconName={'halfstar'} key={utilService.makeId()} />)
        fullStarsCount += 1
      }
  
      const emptyStarsCount = 5 - fullStarsCount
      for (let i = 0; i < emptyStarsCount; i++) {
        stars.push(<SvgIcon iconName={'emptystar'} key={utilService.makeId()} />)
      }
      return stars
    }
  }



  // if(chats.length < 1) return <Loader />

  return (
    <main
      className={`chats layout-row ${deviceType !== 'mobile' ? 'desk' : ''}`}
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
                          <span className="name">{chat[role].fullName}</span>
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
        <span className='title'>You haven’t selected a chat</span>
          <span className='subtitle'>Please select a chat to continue a conversation</span>
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
          <section className="user-info">
          <div className="info-block flex column">
        <div className="profile-picture">
          <img src={chatProps.owner.imgUrl} />
          <div className='background'><SvgIcon iconName={'user'} /></div>
          <SvgIcon iconName={userLevel} />
        </div>

        <h2>{chatProps.owner.fullName}</h2>

        <span className="username">@{chatProps.owner.username}</span>

        <div className="stars flex">
          {renderStars()}
          <span className="rating">{chatProps.owner.rating}</span>
          {/* <span className="review-count">
            ({filteredReviews.length} reviews)
          </span> */}
        </div>

        <div className="location-and-time">
          <div className="info-line flex">
            <span className="data flex">
              <SvgIcon iconName={'location'} />
              <span>From</span>
            </span>
            <span className="bold">{chatProps.owner.country}</span>
          </div>

          <div className="info-line flex">
            <span className="data flex">
              <SvgIcon iconName={'user'} />
              <span>Member Since</span>
            </span>
            <span className="bold">
              {month.slice(0, 3)} {year}
            </span>
          </div>

          <div className="info-line flex">
            <span className="data flex">
              <SvgIcon iconName={'clock'} />
              <span>Avg. Response Time</span>
            </span>
            <span className="bold">
              {utilService.getRandomIntInclusive(2, 12)} Hours
            </span>
          </div>

          <div className="info-line flex">
            <span className="data flex">
              <SvgIcon iconName={'airplaneIcon'} />
              <span>Last Delivery</span>
            </span>
            <span className="bold">
              {months[deliveredTime.getMonth()].slice(0, 3)}{' '}
              {deliveredTime.getFullYear()}
            </span>
          </div>
         </div>
         </div>
        </section>
      )}
    </main>)
}
