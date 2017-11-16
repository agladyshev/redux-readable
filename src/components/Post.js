import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

const Post = (props) => (
  <Grid item xs>
    <Paper className={props.classes.paper}>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
    </Paper>
  </Grid>
)

export default withStyles(styles)(Post)