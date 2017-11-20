import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { compose } from 'redux' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPost, fetchComments } from '../actions'

import Comment from './Comment'

const styles = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

class Post extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string,
    classes: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { id, comments, title, dispatch } = this.props
    // if post comments are undefined, fetch them from server
    !comments && dispatch(fetchComments(id))
    // change to fetch just one post
    !title && dispatch(fetchPost(id))
  }

  render() {
    const { comments, classes, title, body} = this.props
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
      <Grid item xs>
        <Paper className={classes.paper}>
          <h2>{title}</h2>
          <p>{body}</p>
        </Paper>
        {commentsRendered}
      </Grid>
    )
  }
}

function mapStateToProps ({ posts, comments }, { match }) {
  const id = match.params.id
  const { body="", title="" } = posts.has(id) ? posts.get(id) : {}
  const postComments = comments.get(id)
  return {
    title: title,
    body: body,
    id: id,
    comments: postComments
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(Post)