
import { utilService } from "../services/util.service"
// import SvgIcon from "./SvgIcon"
// import SvgIcon from './SvgIcon.jsx'


// export function StarDisplay({ starCount }) {
//     let fullStarsCount = Math.floor(starCount)
//     const isHalfStar = starCount % 1 >= 0.5
  
//     const stars = [...Array(fullStarsCount)].map((_, idx) => (
//       <SvgIcon iconName={'star'} key={utilService.makeId()} />
//     ))
  
//     if (isHalfStar) {
//       stars.push(<SvgIcon iconName={'halfstar'} key={utilService.makeId()} />)
//       fullStarsCount += 1
//     }
  
//     const emptyStarsCount = 5 - fullStarsCount
//     for (let i = 0; i < emptyStarsCount; i++) {
//       stars.push(<SvgIcon iconName={'emptystar'} key={utilService.makeId()} />)
//     }
//     return (stars)
// }