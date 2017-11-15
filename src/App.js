import React, { Component } from 'react'
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
      <div className={classes.root}>
        <ButtonAppBar/>
        <AutoGrid/>
        <LabelBottomNavigation/>
      </div>
    )
  }
}

export default withStyles(styles)(App)
