/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import { Link } from 'react-router-dom'

import { capitalize } from '../utils/helpers'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

const styles = {
  root: {
    flex: '0 1 auto',
  },
  button: {
    padding: 0,
  }
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: this.props.match.url.length > 1 
    ? this.props.match.url.substr(1) : this.props.match.url,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount () {
    // console.log(this.state.location.pathname);
  }

  render() {
    const { classes, categories } = this.props
    const { value } = this.state
    console.log(this.state)
    const navBar =  []
    console.log(categories)
    for (const category of categories) {
      const {name, path} = category
      const label = capitalize(name)
      navBar.push(
        <BottomNavigationButton
        component={Link}
        to={path}
        label={label}
        value={name}
        showLabel="true"
        className={classes.button}
        key={name} />
      )
    }
    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationButton component={Link} to="/" label="All" value="/" showLabel="true" className={classes.button}/>
        {navBar}
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

// export default withStyles(styles)(LabelBottomNavigation);

export default compose(
  withStyles(styles),
  withRouter,
)(LabelBottomNavigation)