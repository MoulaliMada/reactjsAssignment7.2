import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import Header from '../Header/Header'
import SideBar from '../SideBar'
import AppContext from '../../context/AppContext'
import TrendingVideoItem from '../TrendingVideoItem'
import {TrendingContainer, TrendingFailureViewImage} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVedios: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(video => ({
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))

      this.setState({
        trendingVedios: updatedData,
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

  renderTrendingDealsList = () => {
    const {trendingVedios} = this.state
    return (
      <ul>
        {trendingVedios.map(each => (
          <TrendingVideoItem item={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderTrendingFailureView = () => (
    <div>
      <TrendingFailureViewImage src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are Having Some Trouble to complete Your Request </p>
      <button onClick={this.getTrendingVideos}>Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderTrendingView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingDealsList()
      case apiStatusConstants.failure:
        return this.renderTrendingFailureView()
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
            <TrendingContainer>
              <SideBar />
              <div>
                <div>
                  <FaFire />
                  <h1>Trending</h1>
                </div>
                {this.renderTrendingView()}
              </div>
            </TrendingContainer>
          </div>
        )}
      </AppContext.Consumer>
    )
  }
}
export default Trending
