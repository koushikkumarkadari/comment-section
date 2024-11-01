import './index.css'

const CommentItem = props => {
  const {eachComment, onLikingComment, onDeletingComment} = props
  const {id, username, userComment, uploaded, isLiked, color} = eachComment
  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeText = isLiked ? 'is-liked' : 'not-liked'
  const onLike = () => {
    onLikingComment(id)
  }
  const onDelete = () => {
    onDeletingComment(id)
  }
  return (
    <li className="comment-container">
      <div className="logo-container">
        <div className={`logo ${color}`}>
          <p>{username[0].toUpperCase()}</p>
        </div>
        <div>
          <div className="username-container">
            <p className="username">{username}</p>
            <p className="uploaded">{uploaded}</p>
          </div>
          <p className="comment">{userComment}</p>
        </div>
      </div>
      <div className="comment-button-container">
        <button className="comment-button" onClick={onLike} type="button">
          <img className="button-img" src={likeImage} alt="like" />
          <p className={likeText}>Like</p>
        </button>
        <button
          data-testid="delete"
          className="comment-button"
          onClick={onDelete}
          type="button"
        >
          <img
            className="button-img"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="horizontal" />
    </li>
  )
}
export default CommentItem
