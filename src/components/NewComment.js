import React from 'react'
import { Paper, Grid, Button} from 'material-ui'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import Done from 'material-ui-icons/Done'
// import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from 'material-ui/styles'

import { newComment } from '../actions'

const styles = theme => ({
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
  },
  root: {
    flex: '1 1 auto',
    'overflow-x': 'hidden',
  },
  right: {
    textAlign: 'right'
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
  }
});

class NewComment extends React.Component {
  static propTypes = {
    parent: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      body: props.body,
      author: props.author,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit(event) {
    // // alert('A name was submitted: ' + this.state.value);
    event.preventDefault()
    const { body, author} = this.state
    const { dispatch, parent } = this.props
    dispatch(newComment(body, author, parent))
    this.setState({body: "", author: ""})
  }

  render() {
    const { classes } = this.props
    const { author="", body="" } = this.state
    return (
      <Paper className={classes.paper}>
        <div>Your reply</div>
        <form className={classes.root} onSubmit={this.handleSubmit}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  id="author"
                  label="Author"
                  className={classes.textField}
                  value={author}
                  onChange={this.handleChange('author')}
                  margin="normal"
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="body"
                  label="Comment"
                  multiline
                  fullWidth
                  value={body}
                  onChange={this.handleChange('body')}
                  className={classes.textField}
                  margin="normal"
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.right}>
                  <Button type="submit" className={classes.button} raised color="primary">
                    <Done className={classes.leftIcon} />
                    Post
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Paper>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(),
)(NewComment)