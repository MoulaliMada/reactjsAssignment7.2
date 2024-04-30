import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const TrendingVideoItemContainer = styled(Link)`
  padding: 20px;
  font-family: 'Roboto';
  text-decoration: none;
  @media (min-width: 768px) {
    display: flex;
  }
`
export const TrendingVideoItemthumbnail = styled.img`
  width: 70%;
  @media (min-width: 768px) {
    width: 50%;
  }
`
export const TrendingVideoprofile = styled.img`
  width: 100px;
  @media (min-width: 768px) {
    width: 70px;
  }
`
