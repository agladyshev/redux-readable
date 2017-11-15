import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import './App.css';
import 'typeface-roboto'
import ButtonAppBar from './ButtonAppBar'
import AutoGrid from './AutoGrid'
import LabelBottomNavigation from './LabelBottomNavigation'

import { withStyles } from 'material-ui/styles';

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
        <Route exact path='/' render={() => (
          <div className={classes.root}>
            <ButtonAppBar/>
            <AutoGrid/>
            <LabelBottomNavigation/>
          </div>
        )}/>
        <Route path='/new' render={() => (
          <div className={classes.root}>
            new post
          </div>
        )}/>
        <Route exact path='/:id' render={() => (
          <div className={classes.root}>
            category
          </div>
        )}/>
        <Route exact path='/post/:id' render={() => (
          <div className={classes.root}>
            post
          </div>
        )}/>
        <Route exact path='/post/:id/edit' render={() => (
          <div className={classes.root}>
            post edit
          </div>
        )}/>
      </div>
    )
  }
}

export default withStyles(styles)(App)
