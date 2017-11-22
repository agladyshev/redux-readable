import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import { KeyboardArrowLeft, KeyboardArrowRight } from 'material-ui-icons'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { votePost, voteComment } from '../actions'

const styles = theme => ({
  menuButton: {
    minWidth: 0,
    padding: 4
  },
});

class VoteControls extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    voteScore: PropTypes.number,
    classes: PropTypes.object.isRequired,
    currentVote: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handleVote = this.handleVote.bind(this)
  }

  handleVote(vote) {
    const { parentId, id, dispatch, currentVote } = this.props
    if (!currentVote) {
      parentId ? dispatch(voteComment(id, vote)) : dispatch(votePost(id, vote))
    } else if (currentVote !== vote) {
      // if person changes his vote, we have to call API twice
      parentId ? dispatch(voteComment(id, vote)) : dispatch(votePost(id, vote))
      parentId ? dispatch(voteComment(id, vote)) : dispatch(votePost(id, vote))
    }
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

function mapStateToProps ({ votes }, { id }) {
  return {
    currentVote: votes.get(id)
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  withRouter
)(VoteControls)

