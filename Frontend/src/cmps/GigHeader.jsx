
import star from "../assets/img/svg/star.icon.svg"
import cat from "../assets/img/cat.jpg"
import catto from "../assets/img/catto.avif"

export function GigHeader({ gig }){
    console.log(gig)
    const rating=gig.owner.rate
    var stars=''
    for(var i=0;i<rating;i++){
        stars+='<img src=/src/assets/img/svg/star.icon.svg />'
    }
    function load(){
        document.querySelector(".stars").innerHTML=stars+`${rating}`+`(${gig.likedByUsers.length})`
    }
    setTimeout(load,10)
    return (
        <section className="gig-header">
        <h2>{gig.title}</h2>
        <div className="rating">
            <img className='catto' src={catto}/>
            <p>Roei</p>
            |
            <p className="stars">
            </p>
        </div>
        <img src={gig.imgUrls[0]}/>
        <div className='gig-images'>
            {/* {gig.imgUrls.map((image)=>{
                <img src={`${image}`}/>
            })} */}
           <img src={gig.imgUrls[0]}/>
           <img src={gig.imgUrls[1]}/>
           <img src={gig.imgUrls[2]}/>
           <img src={gig.imgUrls[3]}/>
           <img src={gig.imgUrls[4]}/>
        </div>
        </section>)
}