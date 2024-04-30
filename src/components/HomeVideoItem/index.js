import {parse, formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {
  HomeVideoItemContainer,
  HomeVideoItemThumbnailImg,
  HomeVideoItemProfileImg,
  HomeVideoItemLink,
} from './StyledComponents'

const HomeVideoItem = props => {
  const {eachItem} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = eachItem
  const {name, profileImageUrl} = channel
  const initialDate = parse(publishedAt, 'MMM dd, yyyy', new Date())
  const distanceToNow = formatDistanceToNow(initialDate, {
    addSuffix: true,
    includeSeconds: false,
  })

  return (
    <HomeVideoItemLink to={`/videos/${id}`}>
      <HomeVideoItemContainer>
        <HomeVideoItemThumbnailImg src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <HomeVideoItemProfileImg src={profileImageUrl} alt="channel logo" />
          <p>{title}</p>
          <p>{name}</p>
          <p>{viewCount} views</p>
          <p>{publishedAt}</p>
        </div>
      </HomeVideoItemContainer>
    </HomeVideoItemLink>
  )
}
export default HomeVideoItem
