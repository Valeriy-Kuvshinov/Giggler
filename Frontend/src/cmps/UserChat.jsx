export function UserChat({ owner, window, chatState, setChatState }) {
  console.log('window: ', window)
  console.log('owner: ', owner)
  console.log('owner.imgUrl:', owner.imgUrl)
  return (
    <>
      <section onClick={()=> setChatState(true)} className="mini-message-bar">
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

      {chatState && <aside className="chat-box"></aside>}
    </>
  )
}
