import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// material-ui components
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { KeyboardArrowLeft, KeyboardArrowRight } from 'material-ui-icons'
// own components
import { votePost, voteComment } from './ControlsActions'

const styles = () => ({
  menuButton: {
    minWidth: 0,
    padding: 4
  },
  iconText: {
    'display': 'inline-flex',
    'vertical-align': 'middle',
    'align-items': 'center',
    'justify-content': 'center'
  }
})

class VoteControls extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    voteScore: PropTypes.number,
    classes: PropTypes.object.isRequired,
    currentVote: PropTypes.string,
    voteComment: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleVote = this.handleVote.bind(this)
  }

  handleVote(vote) {
    const { parentId, id, currentVote, voteComment, votePost } = this.props
    if (!currentVote) {
      parentId ? voteComment(id, vote) : votePost(id, vote)
    } else if (currentVote !== vote) {
      // if person changes his vote, we have to call API twice
      // since server doesn't store user information
      parentId ? voteComment(id, vote) : votePost(id, vote)
      parentId ? voteComment(id, vote) : votePost(id, vote)
    }
  }

  render() {
    const { classes, voteScore } = this.props
    return (
      <div className={classes.iconText}>
        <Button
          onClick={() => {
            this.handleVote('downVote')
          }}
          className={classes.menuButton}
          value='downVote'>
          <KeyboardArrowLeft/>
        </Button>
        {voteScore}
        <Button
          onClick={() => {
            this.handleVote('upVote')
          }}
          className={classes.menuButton}
          value='upVote'>
          <KeyboardArrowRight/>
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ votes }, { id }) => {
  return {
    currentVote: votes.get(id)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ voteComment, votePost }, dispatch)

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(VoteControls)

