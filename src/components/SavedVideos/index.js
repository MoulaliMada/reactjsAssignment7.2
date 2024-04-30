import {Component} from 'react'
import AppContext from '../../context/AppContext'
import Header from '../Header/Header'
import SideBar from '../SideBar'
import {SavedVideosContainer, SavedVideosimg} from './StyledComponents'

import TrendingVideoItem from '../TrendingVideoItem'

class SavedVideos extends Component {
  renderNovideosView = () => (
    <div>
      <SavedVideosimg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  renderVideosView = savedVideosList => (
    <ul>
      {savedVideosList.map(each => (
        <TrendingVideoItem key={each.id} item={each} />
      ))}
    </ul>
  )

  renderSavedVideos = savedVideosList => {
    console.log(savedVideosList)
    const len = savedVideosList.length
    return len === 0
      ? this.renderNovideosView()
      : this.renderVideosView(savedVideosList)
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {savedVideosList} = value
          return (
            <div>
              <Header />
              <SavedVideosContainer>
                <SideBar />
                <div>
                  <h1>Saved Videos</h1>
                  {this.renderSavedVideos(savedVideosList)}
                </div>
              </SavedVideosContainer>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default SavedVideos
