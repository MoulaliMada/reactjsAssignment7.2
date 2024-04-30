import styled from 'styled-components'

export const VideoItemDetailsContainer = styled.div`
  display: flex;
  font-family: 'Roboto';
`
export const VideoItemDetailslikesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const VideoItemDetailsbiewContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const VideoItemDetailsLikeDislikeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`
export const VideoItemDetailsLike = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.isLiked ? '#2563eb' : '#64748b')};
`
export const VideoItemDetailsDisLike = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.isDisliked ? '#2563eb' : '#64748b')};
`
export const VideoItemDetailsSave = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.isSaved ? '#2563eb' : '#64748b')};
`
