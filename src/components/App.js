import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import 'typeface-roboto'
import ButtonAppBar from './ButtonAppBar'
import AutoGrid from './AutoGrid'
import LabelBottomNavigation from './LabelBottomNavigation'

import { withStyles } from 'material-ui/styles';

import { fetchPosts } from '../utils/api'
import { fetchComments } from '../utils/api'


const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    'flex-flow': 'column'
  }
})

class App extends Component {
  // componentDidMount() {
  //   fetchPosts()
  //   .then((posts) => {
  //     posts.forEach(post => {
  //       console.log(post)
  //       fetchComments(post.id)
  //       .then((comments) => console.log(comments))
  //     })
  //   })
  //   fetchCategories()
  //   .then((categories) => console.log(categories))
  // }

  render() {
    const { classes } = this.props;
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <div className={classes.root}>
            <ButtonAppBar/>
            <AutoGrid/>
            <LabelBottomNavigation/>
          </div>
        )}/>
        <Route exact path='/:id' render={() => (
          <div className={classes.root}>
            <ButtonAppBar/>
            <AutoGrid/>
            <LabelBottomNavigation/>
          </div>
        )}/>
        <Route exact path='/post/:id' render={() => (
          <div className={classes.root}>
            <ButtonAppBar/>
            <AutoGrid/>
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
    )
  }
}

export default withStyles(styles)(App)
