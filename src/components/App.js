import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import 'typeface-roboto'
import ButtonAppBar from './ButtonAppBar'
import AutoGrid from './AutoGrid'
import Post from './Post'
import PostsGrid from './PostsGrid'
import LabelBottomNavigation from './LabelBottomNavigation'

import { withStyles } from 'material-ui/styles';

import { fetchPosts } from '../utils/api'
import { fetchComments } from '../utils/api'

// import { connect } from 'react-redux';
import { compose } from 'redux'

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    'flex-flow': 'column'
  }
})

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => (
            <div className={classes.root}>
              <ButtonAppBar/>         
              <PostsGrid/>
              <LabelBottomNavigation/>
            </div>
          )}/>

          <Route exact path='/:category' render={() => (
            <div className={classes.root}>
              <ButtonAppBar/>
              <PostsGrid/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/post/:id' render={() => (
            <div className={classes.root}>
              <ButtonAppBar/>
              <Post/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/post/:id/edit' render={() => (
            <div className={classes.root}>
              <ButtonAppBar/>
              <AutoGrid/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/new' render={() => (
            <div className={classes.root}>
              <ButtonAppBar/>
              <AutoGrid/>
              <LabelBottomNavigation/>
            </div>
          )}/>
        </Switch>
      </div>
    )
  }
}

// function mapStateToProps ({ categories, posts }) {
//   return {
//     categories: categories,
//     posts: posts
//   }
// }

export default compose(
  withStyles(styles),
  // connect(mapStateToProps),
)(App)