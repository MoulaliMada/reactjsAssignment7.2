import styled from 'styled-components'
import {FaListUl, FaMoon} from 'react-icons/fa'
import {IoSunnyOutline} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'

export const HeaderLogo = styled.img`
  width: 100px;
  align-self: center;
  @media (min-width: 768px) {
    width: 150px;
  }
`
export const HeaderbgContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const HeaderbgbgContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const HeaderitemsContainer = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderListItems = styled.ul`
  font-family: 'Roboto';
  padding: 20px;
`
export const HeaderHome = styled.p`
  background-color: ${props => (props.isHomeActive ? '#cbd5e1' : 'white')};
  color: black;
  text-decoration: none;
  padding: 10px;
`
export const HeaderTrending = styled.p`
  background-color: ${props => (props.isTrendingActive ? '#cbd5e1' : 'white')};
  padding: 10px;
`
export const HeaderGaming = styled.p`
  background-color: ${props => (props.isGamingActive ? '#cbd5e1' : 'white')};
  padding: 10px;
`
export const HeaderSavedVideos = styled.p`
  background-color: ${props =>
    props.isSavedVideosActive ? '#cbd5e1' : 'white'};
  padding: 10px;
`
export const HeaderLogoutConformBtn = styled.button`
  background-color: #3b82f6;
  padding: 10px;
  color: white;
  outline: none;
  border: none;
`
export const HeaderLogOutContainer = styled.div`
  display: flex;
  padding: 10px;
`
export const HeaderLogOutbtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  @media (min-width: 768px) {
    display: none;
  }
`
export const HeaderLogOutbtndesktop = styled.button`
  display: flex;
  display: flex;
  background-color: transparent;
  color: #3b82f6;
  border-color: #3b82f6;
  border-style: solid;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
`
export const HeaderFaListUl = styled(FaListUl)`
  @media (min-width: 768px) {
    display: none;
  }
  width: 25px;
  height: 25px;
`
export const HeaderthemBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
`
export const HeaderLightThem = styled(FaMoon)`
  width: 20px;
  height: 20px;
`

export const HeaderDarkThem = styled(IoSunnyOutline)`
  width: 20px;
  height: 20px;
`
export const HeaderLogOut = styled(FiLogOut)`
  width: 20px;
  height: 20px;
`
export const HeaderProfileImg = styled.img`
  width: 30px;
  @media (min-width: 768px) {
    display: flex;
    width: 30px;
  }
`
