import {Component} from 'react'
import {FiLogOut} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import {Link, withRouter} from 'react-router-dom'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import AppContext from '../../context/AppContext'

import {
  HeaderLogo,
  HeaderitemsContainer,
  HeaderLogOut,
  HeaderDarkThem,
  HeaderLightThem,
  HeaderLogoutConformBtn,
  HeaderProfileImg,
  HeaderthemBtn,
  HeaderFaListUl,
  HeaderLogOutbtndesktop,
  HeaderSavedVideos,
  HeaderLogOutbtn,
  HeaderHome,
  HeaderListItems,
  HeaderTrending,
  HeaderGaming,
  HeaderbgContainer,
} from './StyledComponents'

class Header extends Component {
  state = {
    isClickList: false,
    isHomeActive: true,
    isTrendingActive: false,
    isGamingActive: false,
    isSavedVideosActive: false,
  }

  onClickList = () => {
    this.setState(prevState => ({
      isClickList: !prevState.isClickList,
    }))
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

  onClickConformLogoutBtn = props => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  render() {
    const {
      isClickList,
      isHomeActive,
      isTrendingActive,
      isGamingActive,
      isSavedVideosActive,
    } = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {isLightTheme, onClickThem} = value
          return (
            <div>
              <HeaderbgContainer>
                <Link to="/">
                  <HeaderLogo
                    src={
                      isLightTheme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    }
                    alt="website logo"
                  />
                </Link>
                <HeaderitemsContainer>
                  <HeaderthemBtn onClick={onClickThem} data-testid="theme">
                    {isLightTheme ? <HeaderLightThem /> : <HeaderDarkThem />}
                  </HeaderthemBtn>

                  <HeaderFaListUl onClick={this.onClickList} />
                  <HeaderProfileImg
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                  <div className="popup-container">
                    <Popup
                      modal
                      trigger={
                        <div>
                          <HeaderLogOutbtn
                            type="button"
                            className="trigger-button"
                          >
                            <HeaderLogOut />
                          </HeaderLogOutbtn>
                          <HeaderLogOutbtndesktop>
                            Logout
                          </HeaderLogOutbtndesktop>
                        </div>
                      }
                    >
                      {close => (
                        <>
                          <div>
                            <p>Are you sure, you want to logout</p>
                          </div>
                          <button
                            type="button"
                            className="trigger-button"
                            onClick={() => close()}
                            data-testid="close"
                          >
                            Cancel
                          </button>
                          <HeaderLogoutConformBtn
                            onClick={() =>
                              this.onClickConformLogoutBtn(this.props)
                            }
                          >
                            Confirm
                          </HeaderLogoutConformBtn>
                        </>
                      )}
                    </Popup>
                  </div>
                </HeaderitemsContainer>
              </HeaderbgContainer>
              {isClickList ? (
                <HeaderListItems>
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
                </HeaderListItems>
              ) : (
                ''
              )}
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default withRouter(Header)
