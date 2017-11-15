/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import { Link } from 'react-router-dom'

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
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationButton component={Link} to="/" label="All" value="All" showLabel="true" className={classes.button}/>
        <BottomNavigationButton component={Link} to="/react" label="React" value="React" showLabel="true" className={classes.button}/>
        <BottomNavigationButton component={Link} to="/redux" label="Redux" value="Redux" showLabel="true" className={classes.button}/>
        <BottomNavigationButton component={Link} to="/udacity" label="Udacity" value="Udacity" showLabel="true" className={classes.button}/>
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);