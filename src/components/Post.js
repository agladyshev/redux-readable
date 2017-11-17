import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { compose } from 'redux' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPosts } from '../actions'

const styles = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

class Post extends React.Component {

  componentWillMount() {
    // change to fetch just one post
    console.log(!this.props.title)
    !this.props.title && this.props.dispatch(fetchPosts())
  }

  render() {
    console.log(this.props)
    return(
      <Grid item xs>
        <Paper className={this.props.classes.paper}>
          <h2>{this.props.title}</h2>
          <p>{this.props.body}</p>
        </Paper>
      </Grid>
    )
  }
  
}

function mapStateToProps ({ posts }, { match }) {
  const id = match.params.id
  const [{ body="", title="" }={}] = posts.filter(post => post.id === id)
  return {
    title: title,
    body: body,
    id: id
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(Post)