/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home'

import { Link } from 'react-router-dom'

import { capitalize } from '../utils/helpers'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { fetchCategories } from '../actions'

// import ReactIcon from '../icons/ReactIcon'
import * as Icons from '../icons'

const styles = {
  root: {
    flex: '0 0 auto',
    // height: '48px',
  },
  button: {
    padding: 0,
  }
}

// const icons = new Map

class LabelBottomNavigation extends React.Component {
  state = {
    value: this.props.match.url.length > 1 
    ? this.props.match.params.category : this.props.match.url,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount() {
    !this.props.categories.length && this.props.dispatch(fetchCategories())
  }

  render() {
    // for (const icon of Icons) {
    //   console.log('here')
    // }
    const { classes, categories } = this.props
    const { value } = this.state
    const navBar =  []
    for (const category of categories) {
      const {name, path} = category
      const label = capitalize(name)
      const Icon = Icons[`${label}Icon`]
      navBar.push(
        <BottomNavigationButton
        component={Link}
        to={{pathname:`/${path}`}}
        label={label}
        value={name}
        className={classes.button}
        icon={React.createElement(Icon, null)}
        key={name} />
      )
    }
    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationButton 
          component={Link}
          to="/"
          label="All"
          value="/"
          className={classes.button}
          icon={<HomeIcon />}>
        </BottomNavigationButton>  
        {navBar}
      </BottomNavigation>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: categories,
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // categories: PropTypes.Array.isRequired
};

// export default withStyles(styles)(LabelBottomNavigation);

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(LabelBottomNavigation)