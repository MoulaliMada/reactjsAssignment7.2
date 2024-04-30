import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const HomeVideoItemContainer = styled.div``

export const HomeVideoItemThumbnailImg = styled.img`
  width: 100%;
  @media (min-width: 768px) {
  }
`
export const HomeVideoItemProfileImg = styled.img`
  width: 30px;
`
export const HomeVideoItemLink = styled(Link)`
  text-decoration:none;
  color:black;
  width:100%
padding:10px;
font-family:"Roboto";
@media(min-width:768px){
  width:30%;
}
  `
