import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header/Header'
import SideBar from '../SideBar'
import AppContext from '../../context/AppContext'

import {GamingContainer, Gamingfailureimg, Gamingul} from './StyledComponents'

import GamingVideoItem from '../GamingVideoItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVedios: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        gamingVedios: updatedData,
        apiStatus: apiStatusConstants.success,
        isLoading: false,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        isLoading: false,
      })
    }
  }

  renderGamingDealsList = () => {
    const {gamingVedios} = this.state
    return (
      <Gamingul>
        {gamingVedios.map(each => (
          <GamingVideoItem key={each.id} each={each} />
        ))}
      </Gamingul>
    )
  }

  renderGamingFailureView = () => (
    <div>
      <Gamingfailureimg src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are Having Some Trouble to complete Your Request </p>
      <button onClick={this.getGamingVideos}>Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderGamingVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingDealsList()
      case apiStatusConstants.failure:
        return this.renderGamingFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => (
          <div>
            <Header />
            <GamingContainer>
              <SideBar />
              <div>
                <h1>Gaming</h1>
                {this.renderGamingVideos()}
              </div>
            </GamingContainer>
          </div>
        )}
      </AppContext.Consumer>
    )
  }
}
export default Gaming
