import React from 'react'
import { svgService } from '../services/svg.service.jsx'

const SvgIcon = ({ iconName }) => {
 const svg = svgService.getIcon(iconName)
 return (
  <i dangerouslySetInnerHTML={{ __html: svg }} ></i>
 )
}

export default SvgIcon