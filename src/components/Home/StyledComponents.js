import styled from 'styled-components'
import {IoIosClose} from 'react-icons/io'

export const HomeBgContainer = styled.div`
  display: flex;
`
export const HomeContainer = styled.div`
  width: 80%;
`
export const HomebannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  width: 100%;
  height: 300px;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`
export const HomeBannerCancelBtn = styled(IoIosClose)`
  width: 30px;
  height: 30px;
`
export const HomeFailureViewImage = styled.img`
  width: 80%;
`
export const HomeVideosItemsUl = styled.ul`
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`
