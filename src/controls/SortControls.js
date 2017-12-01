import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// material-ui components
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
// own components
import { changeSortMethod } from './ControlsActions'

const sortMethods = new Map([
  [ 'timestamp', 'date' ],
  [ 'voteScore', 'score' ],
  [ 'commentCount', 'comments' ]])

class SortControls extends React.Component {
  static propTypes = {
    sort: PropTypes.string.isRequired
  }

  state = {
    anchorEl: null,
    open: false
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  };

  handleRequestClose = (e, method) => {
    this.setState({ open: false })
    method && this.props.dispatch(changeSortMethod(method))
  };

  render() {
    const menuItems = []
    sortMethods.forEach((value, key) => menuItems.push(
      <MenuItem
        onClick={(e) => this.handleRequestClose(e, key)}
        key={key}>
        Sort by {value}
      </MenuItem>
    ))
    return (
      <div>
        <Button
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}
          color='contrast'
        >
          Sort by {sortMethods.get(this.props.sort)}
        </Button>
        <Menu
          id='simple-menu'
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {menuItems}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ sort }) => ({
  sort: sort
})

export default connect(mapStateToProps)(SortControls)
