import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { connect } from 'react-redux'
import { compose } from 'redux'

const styles = theme => ({
  root: {
    flex: '1 1 auto',
    margin: '1rem',
    'overflow-x': 'hidden',
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function PostsGrid(props) {
  const { classes, posts } = props;
  console.log(posts)

  return (
    <div className={classes.root}>
      <Grid container
        spacing={24}
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        <Grid item xs>
          <Paper className={classes.paper}>Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem Lorem Ipsum Dorem</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

PostsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps ({ posts }) {
  return {
    posts: posts,
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(PostsGrid)