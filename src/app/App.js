import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import 'typeface-roboto'

import ButtonAppBar from '../controls/ButtonAppBar'
import Post from '../post/Post'
import PostForm from '../post/PostForm'
import PostsGrid from '../post/PostsGrid'
import NotFound from './NotFound'
import LabelBottomNavigation from '../navigation/LabelBottomNavigation'

const styles = () => ({
  root: {
    'margin': 'auto',
    'max-width': '50rem'
  },
  flex: {
    'height': '100vh',
    'display': 'flex',
    'flex-flow': 'column'
  }
})

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Switch>
          <Route exact path='/page-not-found' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(['back'])}/>
              <NotFound/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(['add', 'sort'])}/>
              <PostsGrid/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/new' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(['back'])}/>
              <PostForm/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/:category' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(['add', 'sort'])}/>
              <PostsGrid/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/:category/:id' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(['back', 'delete', 'edit'])}/>
              <Post/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/:category/:id/edit' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(['back', 'delete'])}/>
              <PostForm/>
              <LabelBottomNavigation/>
            </div>
          )}/>
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
