import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// material-ui components
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { Delete } from 'material-ui-icons'
// own components
import { deletePost, deleteComment } from '../actions'

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
    classes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    const { parentId, id, dispatch, history } = this.props
    // if parent id is provided, the object is comment, not a post
    parentId ? dispatch(deleteComment(id)) : dispatch(deletePost(id))
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

export default compose(
  withStyles(styles),
  withRouter,
  connect(),
)(DeleteButton)
