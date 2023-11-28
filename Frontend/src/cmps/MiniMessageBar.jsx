export function MiniMessageBar({ gigOwner, deviceType, handleOpenChat }) {
    return (
        <section onClick={handleOpenChat} className="mini-message-bar">
            <div className="mini-message-bar-container grid">
                <div
                    style={{
                        height: deviceType === 'mobile' ? '32px' :
                            deviceType === 'tablet' ? '32px' :
                                '48px',
                        width: deviceType === 'mobile' ? '32px' :
                            deviceType === 'tablet' ? '32px' :
                                '48px',
                    }}
                    className="avatar"
                >
                    <img src={gigOwner.imgUrl} alt={gigOwner.username} />
                    <span
                        style={{
                            height: deviceType === 'mobile' ? '.65em' :
                                deviceType === 'tablet' ? '.65em' :
                                    '1em',
                            width: deviceType === 'mobile' ? '.65em' :
                                deviceType === 'tablet' ? '.65em' :
                                    '1em',
                        }}
                        className="status-dot"
                    >
                    </span>
                </div>
                <div className="owner-info flex column">
                    <span className="message">
                        {deviceType === 'mobile' ? 'Chat' :
                            deviceType === 'tablet' ? 'Message' :
                                `Message ${gigOwner.fullName}`}
                    </span>
                    {deviceType === 'desktop' && (
                        <span className="response-time flex">
                            <span>Online</span>
                            <span className="dot flex"></span>
                            <span>
                                Avg. response time:
                                <span className="b"> 1 Hour</span>
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </section>
    )
}