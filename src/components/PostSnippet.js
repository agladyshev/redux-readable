import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { Link } from 'react-router-dom'

const styles = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

const PostSnippet = (props) => (
  <Grid item xs>
    <Paper className={props.classes.paper}>
      <Link to={{
        pathname: `/post/${props.id}`
      }}>
      <h2>{props.title}</h2></Link>
      <p>{props.body}</p>
    </Paper>
  </Grid>
)

PostSnippet.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostSnippet)