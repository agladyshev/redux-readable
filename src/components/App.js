import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'typeface-roboto'
import ButtonAppBar from './ButtonAppBar'
import Post from './Post'
import PostsGrid from './PostsGrid'
import LabelBottomNavigation from './LabelBottomNavigation'

import { withStyles } from 'material-ui/styles'

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
              <Post/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/new' render={() => (
            <div className={classes.root}>
              <ButtonAppBar/>
              <Post/>
              <LabelBottomNavigation/>
            </div>
          )}/>
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)