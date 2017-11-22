import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { compose } from 'redux' 
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { fetchPost, fetchComments } from '../actions'

import Comment from './Comment'
import VoteControls from './VoteControls'
import NewComment from './NewComment'

import moment from 'moment'

const styles = theme => ({
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
  },
  root: {
    flex: '1 1 auto',
    // margin: '1rem',
    'overflow-x': 'hidden',
  },
  right: {
    textAlign: 'right'
  }
});

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
    }
  }  

  componentWillMount() {
    const { id, comments, title, dispatch } = this.props
    // if post comments are undefined, fetch them from server
    !comments && dispatch(fetchComments(id))
    !title && dispatch(fetchPost(id))
  }

  render() {
    const { comments, classes, title, body, author, timestamp, voteScore, id} = this.props
    const commentsRendered = []
    comments && comments.forEach((comment) => {
      const {body, author, id} = comment
      commentsRendered.push(
        <Comment
        body={body}
        author={author}
        key={id} />
      )
    })
    return(
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
          <div>{body}</div>
          <Grid container>
            <Grid item xs={8}>
              <h5>by {author}</h5>
            </Grid>
            <Grid item xs={4} className={classes.right}>
              <h5><VoteControls voteScore={voteScore} id={id}/></h5>
            </Grid>
          </Grid>
        </Paper>
        <Grid item xs>
          <NewComment parent={id}/>
        </Grid>
        <Grid item xs>
          {commentsRendered}
        </Grid>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }, { match }) {
  const id = match.params.id
  const { body="", title="", author="", timestamp=0, voteScore=0 } = posts.has(id) ? posts.get(id) : {}
  const postComments = comments.get(id)
  return {
    title: title,
    body: body,
    id: id,
    author: author,
    timestamp: timestamp,
    voteScore: voteScore,
    comments: postComments
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(Post)