import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withRouter } from 'react-router-dom'

import Post from './Post'

import { connect } from 'react-redux'
import { compose } from 'redux'

import { fetchPosts } from '../actions'

const styles = theme => ({
  root: {
    flex: '1 1 auto',
    margin: '1rem',
    'overflow-x': 'hidden',
  },
  // paper: {
  //   padding: 16,
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
});

class PostsGrid extends React.Component {

  componentWillMount() {
    !this.props.posts.length && this.props.dispatch(fetchPosts())
  }

  render() {
    const { classes, posts} = this.props
    const postsRendered = [] 
    for (const post of posts) {
      const {author, body, commentCount, timestamp, title, voteScore, id} = post
      postsRendered.push(
        <Post
        author={author}
        body={body}
        commentCount={commentCount}
        timestamp={timestamp}
        title={title}
        voteScore={voteScore}
        key={id} />
      )
    }

    return (
      <div className={classes.root}>
        <Grid container
          spacing={24}
          direction='column'
          justify='flex-start'
          alignItems='center'
        >
          {postsRendered}
        </Grid>
      </div>
    );
  }
}

PostsGrid.propTypes = {
  classes: PropTypes.object.isRequired,

};

function mapStateToProps ({ posts }, { match }) {
  const category = match.params.category
  return !category ? {
    posts: posts,
  } : {
    posts: posts.filter(post => post.category === category)
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(PostsGrid)