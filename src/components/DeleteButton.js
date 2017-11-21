import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import Button from 'material-ui/Button';
import { Delete } from 'material-ui-icons'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { deletePost } from '../actions'

const styles = theme => ({
  menuButton: {
    minWidth: 0,
    padding: 4
  },
});

class DeleteButton extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(event) {
    const { id, history, dispatch } = this.props
    dispatch(deletePost(id))
    history.push('/')
  }

  render() {
    const { classes } = this.props
    return (
      <Button
        onClick={this.handleDelete}
        className={classes.menuButton}
        color="contrast"
        ><Delete/>
      </Button>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(),
  withRouter
)(DeleteButton)
