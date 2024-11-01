import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], name: '', comment: '', commentsCount: 0}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    if (name !== '' && comment !== '') {
      const randomNo = Math.floor(Math.random() * 7)
      const randomColor = initialContainerBackgroundClassNames[randomNo]
      const newComment = {
        id: uuidv4(),
        username: name,
        userComment: comment,
        uploaded: formatDistanceToNow(new Date()),
        isLiked: false,
        color: randomColor,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
        commentsCount: prevState.commentsCount + 1,
      }))
    }
  }

  onLikingComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeletingComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => id !== eachComment.id,
      ),
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  render() {
    const {name, comment, commentsList, commentsCount} = this.state
    return (
      <div>
        <div>
          <h1 className="heading">Comments</h1>
          <div className="input-and-img-background-container">
            <form onSubmit={this.onAddComment}>
              <div className="input-background-container">
                <p className="para">Say something about 4.0 Technologies</p>
                <input
                  className="name-input"
                  placeholder="Your Name"
                  onChange={this.onChangeName}
                  value={name}
                  type="text"
                />
                <textarea
                  placeholder="Your Comment"
                  value={comment}
                  onChange={this.onChangeComment}
                  className="comment-textarea"
                >
                  {' '}
                </textarea>
                <button className="add-comment-btn" type="submit">
                  Add Comment
                </button>
              </div>
            </form>
            <div>
              <img
                className="comment-image"
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
        </div>
        <div>
          <div className="comments-count-container">
            <div className="no-of-comments">{commentsCount}</div>
            <p> Comments</p>
          </div>
          <ul className="unordered-list">
            {commentsList.map(eachComment => (
              <CommentItem
                onDeletingComment={this.onDeletingComment}
                onLikingComment={this.onLikingComment}
                key={eachComment.id}
                eachComment={eachComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
