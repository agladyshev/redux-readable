import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';


const styles = theme => ({
  paper: {
    padding: 16,
    margin: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

const Comment = (props) => (
  <Grid item xs>
    <Paper className={props.classes.paper}>
      <h2>{props.author}</h2>
      <p>{props.body}</p>
    </Paper>
  </Grid>
)

export default withStyles(styles)(Comment)