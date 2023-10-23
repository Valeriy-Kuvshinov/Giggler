import React from 'react'
import { svgService } from '../services/svg.service.js'

const SvgIcon = ({ iconName }) => {
 const svg = svgService.getIcon(iconName)
 return (
  <span dangerouslySetInnerHTML={{ __html: svg }} ></span>
 )
}

export default SvgIcon