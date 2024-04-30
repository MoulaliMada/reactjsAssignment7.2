import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import AppContext from '../../context/AppContext'
import {
  SidbarBgContainer,
  SideBarLogo,
  HeaderHome,
  HeaderTrending,
  HeaderSavedVideos,
  SideBarLinksContainer,
  HeaderGaming,
} from './StyledComponents'

class SideBar extends Component {
  state = {
    isHomeActive: true,
    isTrendingActive: false,
    isGamingActive: false,
    isSavedVideosActive: false,
  }

  onClickGaming = () => {
    this.setState({
      isHomeActive: false,
      isTrendingActive: false,
      isGamingActive: true,
      isSavedVideosActive: false,
    })
  }

  onClickSavedVideos = () => {
    this.setState({
      isHomeActive: false,
      isTrendingActive: false,
      isGamingActive: false,
      isSavedVideosActive: true,
    })
  }

  onClickTrending = () => {
    this.setState({
      isHomeActive: false,
      isTrendingActive: true,
      isGamingActive: false,
      isSavedVideosActive: false,
    })
  }

  onClickHome = () => {
    this.setState({
      isHomeActive: true,
      isTrendingActive: false,
      isGamingActive: false,
      isSavedVideosActive: false,
    })
  }

  renderBottomContainer = () => (
    <div>
      <p>CONTACT US</p>
      <div>
        <SideBarLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
        <SideBarLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
        <SideBarLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </div>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  )

  render() {
    const {
      isHomeActive,
      isTrendingActive,
      isGamingActive,
      isSavedVideosActive,
    } = this.state
    return (
      <AppContext.Consumer>
        {value => (
          <SidbarBgContainer>
            <SideBarLinksContainer>
              <Link to="/">
                <HeaderHome
                  isHomeActive={isHomeActive}
                  onClick={this.onClickHome}
                >
                  Home
                </HeaderHome>
              </Link>
              <Link to="/trending">
                <HeaderTrending
                  onClick={this.onClickTrending}
                  isTrendingActive={isTrendingActive}
                >
                  Trending
                </HeaderTrending>
              </Link>
              <Link to="/gaming">
                <HeaderGaming
                  onClick={this.onClickGaming}
                  isGamingActive={isGamingActive}
                >
                  Gaming
                </HeaderGaming>
              </Link>
              <Link to="/saved-videos">
                <HeaderSavedVideos
                  isSavedVideosActive={isSavedVideosActive}
                  onClick={this.onClickSavedVideos}
                >
                  Saved Videos
                </HeaderSavedVideos>
              </Link>
            </SideBarLinksContainer>
            <>{this.renderBottomContainer()}</>
          </SidbarBgContainer>
        )}
      </AppContext.Consumer>
    )
  }
}
export default SideBar
