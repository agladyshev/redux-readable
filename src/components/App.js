import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'typeface-roboto'
import ButtonAppBar from './ButtonAppBar'
import Post from './Post'
import PostForm from './PostForm'
import PostsGrid from './PostsGrid'
import LabelBottomNavigation from './LabelBottomNavigation'

import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    margin: 'auto',
    'max-width': '50rem',

  },
  flex: {
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
        <Switch>
          <Route exact path='/' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(["add", "sort"])}/>         
              <PostsGrid/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/new' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(["back"])}/>
              <PostForm/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/:category' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(["add", "sort"])}/>
              <PostsGrid/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/post/:id' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(["back", "delete", "edit"])}/>
              <Post/>
              <LabelBottomNavigation/>
            </div>
          )}/>
          <Route exact path='/post/:id/edit' render={() => (
            <div className={classes.flex}>
              <ButtonAppBar buttons={new Set(["back", "delete"])}/>
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
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)