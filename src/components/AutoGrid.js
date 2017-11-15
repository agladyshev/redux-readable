import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

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

function AutoGrid(props) {
  const { classes } = props;

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

AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGrid);