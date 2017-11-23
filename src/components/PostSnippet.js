import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
// material-ui components
import { withStyles } from 'material-ui/styles'
import { Paper, Grid, Button } from 'material-ui'
import Create from 'material-ui-icons/Create'
// own components
import DeleteButton from './DeleteButton'
import VoteControls from './VoteControls'

const styles = theme => ({
  paper: {
    padding: 16,
    color: theme.palette.text.secondary
  },
  right: {
    textAlign: 'right'
  },
  menuButton: {
    minWidth: 0,
    padding: 4
  }
})

const PostSnippet = (props) => (
  <Grid item>
    <Paper className={props.classes.paper}>
      <Grid container>
        <Grid item xs={8}>
          <Link to={{
            pathname: `/post/${props.id}`
          }}>
            <h3>{props.title}</h3>
          </Link>
        </Grid>
        <Grid item xs={4} className={props.classes.right}>
          <Link to={{
            pathname: `/post/${props.id}/edit`
          }}>
            <Button
              className={props.classes.menuButton}
              color='inherit'>
              <Create/>
            </Button>
          </Link>
          <DeleteButton id={props.id} color='inherit'/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h5>{moment(props.timestamp).format('MMM D, YYYY')} by {props.author}</h5>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Link to={{
            pathname: `/post/${props.id}`,
            hash: '#comments'
          }}>
            <h5>Comments: {props.commentCount}</h5>
          </Link>
        </Grid>
        <Grid item xs={6} className={props.classes.right}>
          <h5><VoteControls voteScore={props.voteScore} id={props.id}/></h5>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
)

PostSnippet.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostSnippet)
