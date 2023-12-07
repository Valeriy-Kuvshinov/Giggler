import { useSelector } from 'react-redux'
import SvgIcon from '../cmps/SvgIcon'
import { Loader } from '../cmps/Loader'
import { useEffect, useState } from 'react'
import { embedUsersOnChat, loadChats, removeChat } from '../store/chat.actions'
import { UserChat } from '../cmps/UserChat'
import { userService } from '../services/user.service'
// import { useHistory } from 'react-router-dom'

export function Chat() {
  const isLoading = useSelector((storeState) => storeState.chatModule.isLoading)
  const { chats } = useSelector((storeState) => storeState.chatModule)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  // const history = useHistory()
  const [chatState, setChatState] = useState(false)
  const [chatProps, setChatProps] = useState(null)

  useEffect(() => {
    chatsLoading()
    // if (chats)
    setUsersOnChat()
  }, [])

  async function chatsLoading() {
    try {
      await loadChats({ userId: loggedinUser._id })
    } catch (err) {
      console.log("Couldn't load chats:", err)
    } finally {
      // setUsersOnChat()
    }
  }
  async function setUsersOnChat() {
    try {
      const buyerSellerArray = await Promise.all(
        chats.map(async (chat) => {
          const seller = await userService.getById(chat.sellerId)
          const buyer = await userService.getById(chat.buyerId)
          return { seller, buyer }
        })
      )

      buyerSellerArray.forEach((buyerSeller, index) => {
        const chat = { ...chats[index], ...buyerSeller }
        embedUsersOnChat(chat)
      })
    } catch (err) {
      console.log(
        'Problem setting buyer and seller object in the chats array in store',
        err
      )
    }
  }

  async function onRemoveChat(event,chatId) {
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
    setChatState(!chatState)
  }

  // if (isLoading) return <Loader />

  return (
    <main className="chats">
      <section className="chat-header b">
        <span>Chat</span>{' '}
        <span onClick={(event) => goBack(event)}>
          <SvgIcon iconName={'remove'} />
        </span>
      </section>
      <section className="chat-body">
        {chats.length ? (
          <>
            <section className="buyers">
              <span className="title b">Potential Buyers</span>
              {chats
                .filter((chat) => chat.sellerId === loggedinUser._id)
                .map((buyerChat) => {
                  const buyer = buyerChat.messages[0].user
                  return (
                    <article
                      key={buyerChat._id}
                      onClick={() =>
                        onOpenChat({
                          owner: loggedinUser,
                          buyer: buyer,
                          gig: buyerChat.gig,
                        })
                      }
                      className="chat"
                    >
                      <img src={buyer.imgUrl} alt="buyer img" />
                      <div className="chat-info">
                        <div className="user-info">
                          <span className="name-wrapper">
                            <span className="name">{buyer.fullName}</span>
                            <span className="username">@{buyer.username}</span>
                          </span>
                          <span className="time">
                            {new Intl.DateTimeFormat('en-US', {
                              month: 'long',
                              day: 'numeric',
                            }).format(
                              buyerChat.messages[buyerChat.messages.length - 1]
                                .time
                            )}
                          </span>
                        </div>
                        <div className="last-msg">
                          {
                            buyerChat.messages[buyerChat.messages.length - 1]
                              .message
                          }
                        </div>
                      </div>
                      <span
                        onClick={(event) => onRemoveChat(event, buyerChat._id)}
                        className="erase-chat"
                      >
                        <SvgIcon iconName={'deny'} />
                      </span>
                    </article>
                  )
                })}
            </section>

            <section className="sellers b">
              <span className="title">Potential Sellers</span>
              {chats
                .filter((chat) => chat.buyerId === loggedinUser._id)
                .map((sellerChat) => {
                  return (
                    <article
                      key={sellerChat._id}
                      onClick={() =>
                        onOpenChat({
                          owner: sellerChat.seller,
                          buyer: sellerChat.buyer,
                          gig: sellerChat.gig,
                        })
                      }
                      className="chat"
                    >
                      <img src={sellerChat.seller?.imgUrl} alt="buyer img" />
                      <div className="chat-info">
                        <div className="user-info">
                          <span className="name-wrapper">
                            <span className="name">
                              {sellerChat.seller?.fullName}
                            </span>
                            <span className="username">
                              @{sellerChat.seller?.username}
                            </span>
                          </span>
                          <span className="time">
                            {new Intl.DateTimeFormat('en-US', {
                              month: 'long',
                              day: 'numeric',
                            }).format(
                              sellerChat.messages[
                                sellerChat.messages.length - 1
                              ].time
                            )}
                          </span>
                        </div>
                        <div className="last-msg">
                          {
                            sellerChat.messages[sellerChat.messages.length - 1]
                              .message
                          }
                        </div>
                      </div>
                      <span
                        onClick={(event) => onRemoveChat(event, sellerChat._id)}
                        className="erase-chat"
                      >
                        <SvgIcon iconName={'deny'} />
                      </span>
                    </article>
                  )
                })}
            </section>
          </>
        ) : (
          <div>You have no chats opened</div>
        )}
      </section>
      {chatState && (
        <UserChat
          owner={chatProps.owner}
          chatState={chatState}
          setChatState={setChatState}
          buyer={chatProps.buyer}
          gig={chatProps.gig}
        />
      )}
    </main>
  )
}
