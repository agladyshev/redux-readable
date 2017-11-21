import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
// import Add from 'material-ui-icons/Add'
// import ArrowBack from 'material-ui-icons/ArrowBack'
// import Delete from 'material-ui-icons/Delete'
import { Add, Delete, ArrowBack, Create} from 'material-ui-icons'

import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'

const styles = theme => ({
  root: {
    flex: '0 1 auto',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    minWidth: 0,
    padding: 4
  },
});

function ButtonAppBar(props) {
  const { classes, history, buttons, match } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            Readable
          </Typography>
          {buttons.has("back") &&
          <Button onClick={history.goBack} color="contrast" className={classes.menuButton}>
            <ArrowBack/>
          </Button>
          }
          {buttons.has("add") &&
          <Button 
            onClick={() => {history.push("/new")}}
            color="contrast"
            className={classes.menuButton}>
            <Add/>
          </Button>
          }
          {buttons.has("edit") &&
          <Button
            onClick={() => {history.push(`/post/${match.params.id}/edit`)}}
            className={classes.menuButton}
            color="contrast"
            ><Create/>
          </Button>
          }
          {buttons.has("delete") &&
          <Button 
            className={classes.menuButton}
            color="contrast"
            ><Delete/>
          </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withRouter,
)(ButtonAppBar)
