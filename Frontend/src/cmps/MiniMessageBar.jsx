export function MiniMessageBar({ gigOwner, isMobile, handleOpenChat }) {
    return (
        <section onClick={handleOpenChat} className="mini-message-bar">
            <div className="mini-message-bar-container grid">
                <div
                    style={{
                        height: isMobile ? '32px' : '48px',
                        width: isMobile ? '32px' : '48px',
                    }}
                    className="avatar"
                >
                    <img src={gigOwner.imgUrl} alt={gigOwner.username} />
                    <span
                        style={{
                            height: isMobile ? '.65em' : '1em',
                            width: isMobile ? '.65em' : '1em',
                        }}
                        className="status-dot"
                    ></span>
                </div>
                <div className="owner-info flex column">
                    <span className="message">{`Message${isMobile ? '' : ` ${gigOwner.fullName}`}`}</span>
                    {!isMobile && (
                        <span className="response-time flex">
                            <span>Online</span>
                            <span className="dot flex"></span>
                            <span>
                                Avg. response time: <span className="b">1 Hour</span>
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </section>
    )
}