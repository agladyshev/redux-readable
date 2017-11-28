import React from 'react'
// material-ui components
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    'flex': '1 1 auto',
    'overflow-x': 'hidden'
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary
  }
})

const NotFound = (props) => (
  <div className={props.classes.root}>
    <Paper className={props.classes.paper}>
      <h1>
        404 - Page not found
      </h1>
      <h2>Sorry, this page is either deleted or not created yet</h2>
    </Paper>
  </div>
)

export default withStyles(styles)(NotFound)
