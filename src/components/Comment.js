import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// material-ui components
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Create from 'material-ui-icons/Create'
// own components
import DeleteButton from './DeleteButton'
import VoteControls from './VoteControls'
import CommentForm from './CommentForm'

const styles = theme => ({
  paper: {
    padding: 16,
    margin: 20,
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

class Comment extends React.Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit() {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit
      }
    })
  }

  componentWillReceiveProps() {
    this.setState({
      edit: false
    })
  }

  render() {
    const { classes, author, body, timestamp, id, parentId, voteScore } = this.props
    const { edit } = this.state
    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} className={classes.right}>
            <Button
              onClick={this.toggleEdit}
              className={classes.menuButton}
              color='inherit'>
              <Create/>
            </Button>
            <DeleteButton id={id} color='inherit' parentId={parentId}/>
          </Grid>
        </Grid>
        {!edit ?
          <Grid container>
            <Grid item xs={12}>
              {author},&nbsp;
              {moment(timestamp).format('MMM D, YYYY')}
            </Grid>
            <Grid item xs={12}>
              {body}
            </Grid>
            <Grid item xs={12} className={classes.right}>
              <VoteControls
                parentId={parentId}
                id={id}
                voteScore={voteScore}/>
            </Grid>
          </Grid>
          :
          <CommentForm id={id} author={author} body={body}/>
        }
      </Paper>
    )
  }
}

export default withStyles(styles)(Comment)
