import React from 'react'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
// material-ui components
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import CommentIcon from 'material-ui-icons/Comment'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
// own components
import { fetchPost } from '../post/PostActions'
import { fetchComments } from '../comment/CommentActions'
import Comment from '../comment/Comment'
import VoteControls from '../controls/VoteControls'
import CommentForm from '../comment/CommentForm'

const styles = theme => ({
  paper: {
    padding: 16,
    color: theme.palette.text.secondary
  },
  root: {
    'flex': '1 1 auto',
    'overflow-x': 'hidden'
  },
  right: {
    textAlign: 'right'
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class Post extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    comments: PropTypes.array,
    classes: PropTypes.object.isRequired,
    fetchComments: PropTypes.func.isRequired,
    fetchPost: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit() {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit
      }
    })
  }

  componentWillMount() {
    const { id, comments, title, fetchComments, fetchPost } = this.props
    // if post comments are undefined, fetch them from server
    !comments.length && fetchComments(id)
    !title && fetchPost(id)
  }

  componentWillReceiveProps() {
    this.setState({
      edit: false
    })
  }

  render() {
    const { comments, classes, title, body, author, timestamp, voteScore, id } = this.props
    const { edit } = this.state
    const commentsRendered = []
    comments.forEach((comment) => {
      const { body, author, id, deleted, timestamp, voteScore, parentId } = comment
      commentsRendered.push(
        <Comment
          body={body}
          author={author}
          deleted={deleted}
          timestamp={timestamp}
          voteScore={voteScore}
          id={id}
          parentId={parentId}
          key={id} />
      )
    })
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={8}>
              <h3>{title}</h3>
            </Grid>
            <Grid item xs={4} className={classes.right}>
              <h6>{moment(timestamp).format('MMM D, YYYY')}</h6>
            </Grid>
          </Grid>
          <Typography>{body}</Typography>
          <Grid container>
            <Grid item xs={8}>
              <h5>by {author}</h5>
            </Grid>
            <Grid item xs={4} className={classes.right}>
              <h5><VoteControls voteScore={voteScore} id={id}/></h5>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <h5>Comments: {comments.length}</h5>
            </Grid>
            <Grid item xs={8} className={classes.right}>
              <Button
                className={classes.button}
                raised color='accent'
                onClick={this.toggleEdit}>
                Reply
                <CommentIcon className={classes.rightIcon}/>
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {edit &&
        <Grid item xs>
          <Paper className={classes.paper}>
            <CommentForm parent={id}/>
          </Paper>
        </Grid>
        }
        <Grid item xs id='comments'>
          {commentsRendered}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }, { match, history }) => {
  const id = match.params.id
  const { body = '',
    title = '',
    author = '',
    timestamp = 0,
    voteScore = 0,
    deleted = false } = posts.has(id) && posts.get(id)
  // convert map object to simple array and filter deleted posts
  const commentsArray = Array.from((comments.get(id) || []), array => array[1])
    .filter(comment => !comment.deleted && !comment.parentDeleted)
  return {
    title: title,
    body: body,
    id: id,
    author: author,
    timestamp: timestamp,
    voteScore: voteScore,
    comments: commentsArray,
    deleted: deleted
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchComments, fetchPost }, dispatch)

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Post)
