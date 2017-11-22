import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'
import Create from 'material-ui-icons/Create'

import DeleteButton from './DeleteButton'
import VoteControls from './VoteControls'

import moment from 'moment'

const styles = theme => ({
  paper: {
    padding: 16,
    margin: 20,
    color: theme.palette.text.secondary,
  },
  right: {
    textAlign: 'right'
  },
  menuButton: {
    minWidth: 0,
    padding: 4
  },
});

const Comment = (props) => (
  <Paper className={props.classes.paper}>
    <Grid container>
      <Grid item xs={8}>
        <h6>
          {props.author},&nbsp;
          {moment(props.timestamp).format('MMM D, YYYY')}
        </h6>
      </Grid>
      <Grid item xs={4} className={props.classes.right}>
        <Button
          onClick={() => {console.log("here")}}
          className={props.classes.menuButton}
          color="inherit"
          ><Create/>
        </Button>
        <DeleteButton id={props.id} color="inherit" parentId={props.parentId}/>
      </Grid>
    </Grid>
    <p>{props.body}</p>
    <Grid container>
      <Grid item xs={12} className={props.classes.right}>
        <VoteControls 
          parentId={props.parentId}
          id={props.id}
          voteScore={props.voteScore}/>
      </Grid>
    </Grid>
  </Paper>
)

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  deleted: PropTypes.bool.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Comment)