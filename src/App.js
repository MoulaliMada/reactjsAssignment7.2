import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AppContext from './context/AppContext'
import VideoItemDetails from './components/VideoItemDetails'
import Gaming from './components/Gaming'

class App extends Component {
  state = {isLightTheme: true, savedVideosList: []}

  onClickThem = () => {
    this.setState(prevState => ({
      isLightTheme: !prevState.isLightTheme,
    }))
  }

  addVideoInList = videoDetails => {
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, videoDetails],
    }))
  }

  removeVideoInList = videoDetails => {
    const {id} = videoDetails
    const {savedVideosList} = this.state
    const vediosList = savedVideosList.map(each => each.id !== id)
    this.setState({savedVideosList: vediosList})
  }

  render() {
    const {isLightTheme, savedVideosList} = this.state
    return (
      <AppContext.Provider
        value={{
          isLightTheme,
          onClickThem: this.onClickThem,
          savedVideosList,
          addVideoInList: this.addVideoInList,
          removeVideoInList: this.removeVideoInList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute path="/videos/:id" component={VideoItemDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
