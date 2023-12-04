import { useSelector } from 'react-redux'
import SvgIcon from '../cmps/SvgIcon'
import { Loader } from '../cmps/Loader'
import { useEffect, useState } from 'react'
import { loadChats } from '../store/chat.actions'
import { UserChat } from '../cmps/UserChat'
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
    console.log(chats)
  }, [])

  async function chatsLoading() {
    try {
      await loadChats({ userId: loggedinUser._id })
    } catch (err) {
      console.log("Couldn't load chats:", err)
    }
  }

  function goBack() {
    // history.goBack()
  }

  function onOpenChat(props) {
    setChatProps(props)
    setChatState((prevState) => !prevState)
  }

  if (isLoading) return <Loader />

  return (
    <main className="chats">
      <section className="chat-header b">
        <span>Chat</span>{' '}
        <span onClick={() => goBack()}>
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
                          incChat: buyerChat
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
                      <span className="erase-chat">
                        <SvgIcon iconName={'remove'} />
                      </span>
                      {console.log(buyer)}
                    </article>
                  )
                })}
            </section>

            <section className="sellers b">
              <span className="title">Potential Sellers</span>
              {chats
                .filter((chat) => chat.buyerId === loggedinUser._id)
                .map((sellerChat) => {
                  const buyer = sellerChat.messages[0].user
                  return (
                    <article
                      key={sellerChat._id}
                      onClick={() =>
                        onOpenChat({
                          owner: loggedinUser,
                          buyer: buyer,
                          gig: sellerChat.gig,
                          incChat: sellerChat
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
                              sellerChat.messages[sellerChat.messages.length - 1]
                                .time
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
                      <span className="erase-chat">
                        <SvgIcon iconName={'remove'} />
                      </span>
                      {console.log(buyer)}
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
          incChat={chatProps.incChat}
        />
      )}
    </main>
  )
}
