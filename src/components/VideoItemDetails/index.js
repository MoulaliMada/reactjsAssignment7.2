import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {parse, formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'

import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header/Header'
import AppContext from '../../context/AppContext'
import SideBar from '../SideBar'
import {
  VideoItemDetailsContainer,
  VideoItemDetailslikesContainer,
  VideoItemDetailsLikeDislikeContainer,
  VideoItemDetailsSave,
  VideoItemDetailsDisLike,
  VideoItemDetailsLike,
  VideoItemDetailsbiewContainer,
} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: {},
    isLiked: false,
    isSaved: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/videos/${id}`

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const vedioDetails = fetchedData.video_details
      const updatedData = {
        channel: {
          name: vedioDetails.channel.name,
          profileImageUrl: vedioDetails.channel.profile_image_url,
          subscriberCount: vedioDetails.channel.subscriber_count,
        },
        description: vedioDetails.description,
        id: vedioDetails.id,
        publishedAt: vedioDetails.published_at,
        thumbnailUrl: vedioDetails.thumbnail_url,
        title: vedioDetails.title,
        videoUrl: vedioDetails.video_url,
        viewCount: vedioDetails.view_count,
      }

      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickLike = () => {
    const {isLiked} = this.state
    if (isLiked) {
      this.setState({
        isLiked: false,
        isDisliked: false,
      })
    } else {
      this.setState({
        isLiked: true,
        isDisliked: false,
      })
    }
  }

  onClickDislike = () => {
    const {isDisliked} = this.state
    if (isDisliked) {
      this.setState({
        isDisliked: false,
        isLiked: false,
      })
    } else {
      this.setState({
        isDisliked: true,
        isLiked: false,
      })
    }
  }

  onClickSave = (videoDetails, isSaved, addVideoInList, removeVideoInList) => {
    this.setState(prevState => ({
      isSaved: !prevState.isSaved,
    }))
    {
      isSaved ? removeVideoInList(videoDetails) : addVideoInList(videoDetails)
    }
  }

  renderVideoDetailsSuccess = (
    savedVideosList,
    addVideoInList,
    removeVideoInList,
  ) => {
    const {videoDetails, isDisliked, isLiked} = this.state
    const {videoUrl, channel, title, viewCount, publishedAt, id} = videoDetails
    const {description} = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel
    const initialDate = parse(publishedAt, 'MMM dd, yyyy', new Date())
    const distanceToNow = formatDistanceToNow(initialDate, {
      addSuffix: true,
      includeSeconds: false,
    })
    const item = savedVideosList.find(each => each.id === id)

    const isSaved = item !== undefined

    return (
      <div>
        <ReactPlayer url={videoUrl} controls />
        <div>
          <p>{title}</p>
          <VideoItemDetailslikesContainer>
            <VideoItemDetailsbiewContainer>
              <p>{viewCount} views</p>
              <p>{distanceToNow}</p>
            </VideoItemDetailsbiewContainer>
            <VideoItemDetailsLikeDislikeContainer>
              <VideoItemDetailsLike
                onClick={this.onClickLike}
                isLiked={isLiked}
              >
                <BiLike />
                <button>Like</button>
              </VideoItemDetailsLike>
              <VideoItemDetailsDisLike
                onClick={this.onClickDislike}
                isDisliked={isDisliked}
              >
                <BiDislike />
                <button>Dislike</button>
              </VideoItemDetailsDisLike>
              <VideoItemDetailsSave
                onClick={() =>
                  this.onClickSave(
                    videoDetails,
                    isSaved,
                    addVideoInList,
                    removeVideoInList,
                  )
                }
                isSaved={isSaved}
              >
                <MdPlaylistAdd />
                <button>Save</button>
              </VideoItemDetailsSave>
            </VideoItemDetailsLikeDislikeContainer>
          </VideoItemDetailslikesContainer>
        </div>
        <hr />
        <div>
          <img src={profileImageUrl} alt="channel logo" />
          <div>
            <p>{name}</p>
            <p>{subscriberCount} subscribers</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderVideoDealsFailureView = () => (
    <div>
      <h1>failure</h1>
    </div>
  )

  renderVideoLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderVideoDetailsView = (
    savedVideosList,
    addVideoInList,
    removeVideoInList,
  ) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoDetailsSuccess(
          savedVideosList,
          addVideoInList,
          removeVideoInList,
        )
      case apiStatusConstants.failure:
        return this.renderVideoDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderVideoLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {
            savedVideosList,
            isLightTheme,
            addVideoInList,
            removeVideoInList,
          } = value
          return (
            <div>
              <Header />
              <VideoItemDetailsContainer>
                <SideBar />
                <div>
                  {this.renderVideoDetailsView(
                    savedVideosList,
                    addVideoInList,
                    removeVideoInList,
                  )}
                </div>
              </VideoItemDetailsContainer>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default VideoItemDetails
