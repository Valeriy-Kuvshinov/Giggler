export function AboutGig({ gig, deviceType }) {
    return (
        <section className="about-gig" style={{ overflow: 'hidden' }}>
            {deviceType === 'mobile' ? (
                <>
                    <p>{gig.description}</p>
                </>
            ) : (
                <>
                    <h3>About This Gig</h3>
                    <p>{gig.description}</p>
                </>
            )}
        </section>
    )
}