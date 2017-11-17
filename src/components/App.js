import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import 'typeface-roboto'
import ButtonAppBar from './ButtonAppBar'
import AutoGrid from './AutoGrid'
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
      <div className={classes.root}>
        <ButtonAppBar/>
        <Switch>
          <Route exact path='/' render={() => (         
            <PostsGrid/>   
          )}/>
          <Route exact path='/:category' render={(props) => (
            <PostsGrid category={props}/>
          )}/>
          <Route exact path='/post/:id' render={() => (
            <AutoGrid/>
          )}/>
          <Route exact path='/post/:id/edit' render={() => (
            <AutoGrid/>
          )}/>
          <Route exact path='/new' render={() => (
            <AutoGrid/>
          )}/>
        </Switch>
        <LabelBottomNavigation/>
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