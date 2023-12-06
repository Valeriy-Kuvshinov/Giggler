import loaderImg from '../assets/img/favicon-32x32.png'

export function Loader() {
    return <section className="loader-wrapper">
        <div className='loader flex column'>
            <img src={loaderImg} alt="Gi" />
        </div>
    </section>
}