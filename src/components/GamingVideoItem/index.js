import {GamingItemLink, GamingItemimg} from './StyledComponents'

const GamingVideoItem = props => {
  const {each} = props
  const {thumbnailUrl, id, title, viewCount} = each
  return (
    <GamingItemLink to={`/videos/${id}`}>
      <GamingItemimg src={thumbnailUrl} alt="video thumbnail" />
      <p>{title}</p>
      <p>{viewCount} watching</p>
    </GamingItemLink>
  )
}
export default GamingVideoItem
