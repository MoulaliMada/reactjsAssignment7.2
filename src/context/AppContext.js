import React from 'react'

const AppContext = React.createContext({
  savedVideosList: [],
  isLightTheme: true,
  changeThem: () => {},
  isBannerDisplaid: true,
  addVideoInList: () => {},
  removeVideoInList: () => {},
})

export default AppContext
