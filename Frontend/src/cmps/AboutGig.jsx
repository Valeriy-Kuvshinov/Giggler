export function AboutGig({ gig }) {
    return (
        <section className="about-gig" style={{ overflow: 'hidden' }}>
            <h3>About This Gig</h3>
            <p>{gig.description}</p>
        </section>
    )
}