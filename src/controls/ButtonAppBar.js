import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
// material-ui components
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { Add, ArrowBack, Create } from 'material-ui-icons'
// own components
import DeleteButton from './DeleteButton'
import SortControls from './SortControls'

const styles = () => ({
  root: {
    flex: '0 1 auto'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    minWidth: 0,
    padding: 4
  }
})

function ButtonAppBar(props) {
  // Panel renders buttons given the list route provide
  // Can move all buttons into own components and provide button components via props
  const { classes, history, buttons, match } = props
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography type='title' color='inherit' className={classes.flex}>
            Readable
          </Typography>
          {buttons.has('sort') &&
          <SortControls/>
          }
          {buttons.has('back') &&
          <Button onClick={history.goBack} color='contrast' className={classes.menuButton}>
            <ArrowBack/>
          </Button>
          }
          {buttons.has('add') &&
          <Button
            onClick={() => {
              history.push('/new')
            }}
            color='contrast'
            className={classes.menuButton}>
            <Add/>
          </Button>
          }
          {buttons.has('edit') &&
          <Button
            onClick={() => {
              history.push(`/post/${match.params.id}/edit`)
            }}
            className={classes.menuButton}
            color='contrast'>
            <Create/>
          </Button>
          }
          {buttons.has('delete') &&
          <DeleteButton id={match.params.id}/>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withRouter,
)(ButtonAppBar)
