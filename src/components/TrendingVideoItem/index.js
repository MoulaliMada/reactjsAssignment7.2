import {parse, formatDistanceToNow} from 'date-fns'
import {
  TrendingVideoItemContainer,
  TrendingVideoItemthumbnail,
  TrendingVideoprofile,
} from './StyledComponents'

const TrendingVideoItem = props => {
  const {item} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = item
  const {name, profileImageUrl} = channel
  const initialDate = parse(publishedAt, 'MMM dd, yyyy', new Date())
  const distanceToNow = formatDistanceToNow(initialDate, {
    addSuffix: true,
    includeSeconds: false,
  })
  return (
    <TrendingVideoItemContainer to={`/videos/${id}`}>
      <li>
        <TrendingVideoItemthumbnail src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <TrendingVideoprofile src={profileImageUrl} />
          <p>{title}</p>
          <p>{name}</p>
          <p>{viewCount} views</p>
          <p>{distanceToNow}</p>
        </div>
      </li>
    </TrendingVideoItemContainer>
  )
}
export default TrendingVideoItem
