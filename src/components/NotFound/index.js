import {Component} from 'react'
import AppContext from '../../context/AppContext'
import Header from '../Header/Header'
import SideBar from '../SideBar'
import {NotFoundImg, NotFoundContainer} from './StyledComponents'

const NotFound = () => (
  <AppContext.Consumer>
    {value => (
      <div>
        <Header />
        <NotFoundContainer>
          <SideBar />
          <div>
            <NotFoundImg src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" />
            <h1>Page Not Found</h1>
            <p>we are sorry, the page you requested could not be found</p>
          </div>
        </NotFoundContainer>
      </div>
    )}
  </AppContext.Consumer>
)
export default NotFound
