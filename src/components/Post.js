import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
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
import { fetchPost, fetchComments } from '../actions'
import Comment from './Comment'
import VoteControls from './VoteControls'
import CommentForm from './CommentForm'

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
    classes: PropTypes.object.isRequired
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
    const { id, comments, title, dispatch } = this.props
    // if post comments are undefined, fetch them from server
    !comments.length && dispatch(fetchComments(id))
    !title && dispatch(fetchPost(id))
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

function mapStateToProps({ posts, comments }, { match, history }) {
  const id = match.params.id
  const { body = '',
    title = '',
    author = '',
    timestamp = 0,
    voteScore = 0,
    deleted = true } = posts.has(id) && posts.get(id)
    // : {
    //   body: `Sorry, this post is either deleted or doesn't exist yet`,
    //   title: `404 - not found`,
    //   timestamp: null,
    //   voteScore: null
    // }
  // convert map object to simple array and filter deleted posts
  deleted && history.push('/page-not-found')
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

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(Post)
