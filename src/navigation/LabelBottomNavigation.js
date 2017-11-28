import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
// material-ui components
import { withStyles } from 'material-ui/styles'
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation'
import HomeIcon from 'material-ui-icons/Home'
// own components
import { capitalize } from '../utils/helpers'
import { fetchCategories } from '../actions'
// import svg icons turned into react components
// if the number of categories expands
// all we have to do is to put a new icon into icons directory
import * as Icons from '../icons'

const styles = {
  root: {
    flex: '0 0 auto'
  },
  button: {
    padding: 0
  }
}

class LabelBottomNavigation extends React.Component {
  state = {
    // set navigation position value
    value: this.props.match.url.length > 1
      ? this.props.match.params.category : this.props.match.url
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  componentWillMount() {
    !this.props.categories.length && this.props.dispatch(fetchCategories())
  }

  render() {
    const { classes, categories } = this.props
    const { value } = this.state
    const navBar = []
    for (const category of categories) {
      const { name, path } = category
      const label = capitalize(name)
      // a bit of magic to try and find icon for category
      const Icon = Icons[`${label}Icon`]
      navBar.push(
        <BottomNavigationButton
          component={Link}
          to={{ pathname: `/${path}` }}
          label={label}
          value={name}
          className={classes.button}
          // since component name is dynamic, can't use jsx
          icon={React.createElement(Icon, null)}
          key={name} />
      )
    }
    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationButton
          component={Link}
          to='/'
          label='All'
          value='/'
          className={classes.button}
          icon={<HomeIcon />}/>
        {navBar}
      </BottomNavigation>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired
}

// export default withStyles(styles)(LabelBottomNavigation);

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(LabelBottomNavigation)