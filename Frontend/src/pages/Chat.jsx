import { useSelector, useDispatch } from 'react-redux'
import SvgIcon from '../cmps/SvgIcon'
import { Loader } from '../cmps/Loader'
import { useEffect } from 'react'
import { loadChats } from '../store/chat.actions'

export function Chat() {
  const dispatch = useDispatch()
  const isLoading = useSelector((storeState) => storeState.chatModule.isLoading)
  const { chats} = useSelector((storeState) => storeState.chatModule)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    const newFilterBy = { userId: loggedinUser._id }
   loadChats(newFilterBy)
  }, [ loggedinUser])

  if (isLoading) return <Loader />

  return (
    <main className="chat">
      <section className="chat-header b">
        <span>Chat</span> <SvgIcon iconName={'remove'} />
      </section>
      <section className="chat-body">
        {chats.length ? (
          <>
            <section className="buyers">
              <h2>Potential Buyers</h2>
              {chats
                .filter((chat) => chat.sellerId === loggedinUser._id)
                .map((buyerChat) => (
                  <article key={buyerChat._id} className="chat">
                    <img src={buyerChat.gig.imgUrl} alt="" />
                  </article>
                ))}
            </section>

            <section className="sellers">
              <h2>Potential Sellers</h2>
              {chats
                .filter((chat) => chat.buyerId === loggedinUser._id)
                .map((sellerChat) => (
                  <article key={sellerChat._id} className="chat">
                    <img src={sellerChat.gig.imgUrl} alt="" />
                  </article>
                ))}
            </section>
          </>
        ) : (
          <div>You have no chats opened</div>
        )}
      </section>
    </main>
  )
}
