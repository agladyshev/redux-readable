import React from 'react'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// material-ui components
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { Delete } from 'material-ui-icons'
// own components
import { deletePost, deleteComment } from './ControlsActions'

const styles = () => ({
  menuButton: {
    minWidth: 0,
    padding: 4
  }
})

class DeleteButton extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    color: PropTypes.string,
    classes: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    const { parentId, id, history, deleteComment, deletePost } = this.props
    // if parent id is provided, the object is comment, not a post
    parentId ? deleteComment(id) : deletePost(id)
    !parentId && history.push('/')
  }

  render() {
    const { classes, color = 'contrast' } = this.props
    return (
      <Button
        onClick={this.handleDelete}
        className={classes.menuButton}
        color={color}>
        <Delete/>
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteComment, deletePost }, dispatch)

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps),
)(DeleteButton)
