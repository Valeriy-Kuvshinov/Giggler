import catto from '../assets/img/catto.avif'

export function UserInfo({user}){
    return (<section className='user-info'>
        <div className='info-block'>
            <img src={catto}/>
            <span>Catto</span>
            <div className='into-line'>
                <span>😀 Country</span>
                <span>Israel</span>
            </div>
            <div className='into-line'>
                <span>💀 Member Since</span>
                <span>May 42069</span>
            </div>

        </div>
        <div className='info-block'>
            <h3>Description</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                 Sint voluptatum eius architecto assumenda, quaerat a.
                  Beatae consequuntur possimus iste,pariatur hic impedit at modi,
                   rem quam velit debitis. Fugiat, magni!</p>
        </div>
            </section>)
}