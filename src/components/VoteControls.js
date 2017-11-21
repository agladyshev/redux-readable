import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import { KeyboardArrowLeft, KeyboardArrowRight } from 'material-ui-icons'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { votePost } from '../actions'

const styles = theme => ({
  menuButton: {
    minWidth: 0,
    padding: 4
  },
});

class VoteControls extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    voteScore: PropTypes.number,
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleVote = this.handleVote.bind(this)
  }

  handleVote(vote) {
    const { id, dispatch } = this.props
    dispatch(votePost(id, vote))
  }

  render() {
    const { classes, voteScore } = this.props
    return (
      <div>
        <Button
          onClick={() => {this.handleVote("downVote")}}
          className={classes.menuButton}
          value="downVote"
          >
        <KeyboardArrowLeft/>
        </Button>
        {voteScore}
        <Button
          onClick={() => {this.handleVote("upVote")}}
          className={classes.menuButton}
          value="upVote"
          >
        <KeyboardArrowRight/>
        </Button>
      </div> 
    )
  }
}

export default compose(
  withStyles(styles),
  connect(),
  withRouter
)(VoteControls)

