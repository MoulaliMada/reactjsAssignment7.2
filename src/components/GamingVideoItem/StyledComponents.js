import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const GamingItemLink = styled(Link)`
  padding: 10px;
  font-family: 'Roboto';
  width: 50%;
  text-decoration: none;

  @media (min-width: 768px) {
    width: 23%;
  }
`
export const GamingItemimg = styled.img`
  width: 50%;
  @media (min-width: 768px) {
    width: 100%;
  }
`
