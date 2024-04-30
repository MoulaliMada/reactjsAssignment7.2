import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header/Header'
import SideBar from '../SideBar'
import AppContext from '../../context/AppContext'
import HomeVideoItem from '../HomeVideoItem'
import {
  HomeBgContainer,
  HomeContainer,
  HomeVideosItemsUl,
  HomeBannerCancelBtn,
  HomeFailureViewImage,
  HomebannerContainer,
} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isBannerDisplay: true,
    seachInput: '',
    apiStatus: apiStatusConstants.initial,
    getSearchInput: '',
    homeVidos: [],
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const {getSearchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const input = getSearchInput.toLocaleLowerCase()

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${input}`
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
        homeVidos: updatedData,
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

  onClickBannerCancel = () => {
    this.setState({isBannerDisplay: false})
  }

  displayBanner = () => (
    <HomebannerContainer data-testid="banner">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button>GET IT NOW</button>
      </div>
      <HomeBannerCancelBtn
        onClick={this.onClickBannerCancel}
        data-testid="close"
      />
    </HomebannerContainer>
  )

  onChangeSearchInput = event => {
    this.setState({seachInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {seachInput} = this.state
    this.setState({getSearchInput: seachInput}, this.getHomeVideos)
  }

  onClickRetryBtn = () => {
    {
      this.getHomeVideos()
    }
  }

  renderHomeNotFoundView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button onClick={() => this.getHomeVideos()}>Retry</button>
    </div>
  )

  renderHomeVideoItems = () => {
    const {homeVidos} = this.state
    return (
      <HomeVideosItemsUl>
        {homeVidos.map(each => (
          <HomeVideoItem eachItem={each} key={each.id} />
        ))}
      </HomeVideosItemsUl>
    )
  }

  renderHomeDealsList = () => {
    const {homeVidos} = this.state
    const len = homeVidos.length
    return (
      <>
        {len === 0
          ? this.renderHomeNotFoundView()
          : this.renderHomeVideoItems()}
      </>
    )
  }

  renderHomeDealsFailureView = () => (
    <div>
      <HomeFailureViewImage src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are Having Some Trouble to complete Your Request </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderHomeResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeDealsList()
      case apiStatusConstants.failure:
        return this.renderHomeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {isBannerDisplay, seachInpu} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          return (
            <div>
              <Header />
              <HomeBgContainer>
                <SideBar />
                <HomeContainer>
                  {isBannerDisplay && this.displayBanner()}
                  <div>
                    <div>
                      <input
                        type="search"
                        onChange={this.onChangeSearchInput}
                        value={seachInpu}
                      />
                      <button
                        onClick={this.onClickSearchIcon}
                        data-testid="searchButton"
                        type="button"
                      >
                        <FaSearch />
                      </button>
                    </div>
                    {this.renderHomeResult()}
                  </div>
                </HomeContainer>
              </HomeBgContainer>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default Home
