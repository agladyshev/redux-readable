import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
// material-ui components
import { Paper, Grid, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Done from 'material-ui-icons/Done'
// own components
import { newComment, editComment } from './CommentActions'

const styles = theme => ({
  root: {
    'flex': '1 1 auto',
    'overflow-x': 'hidden'
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary
  },
  right: {
    textAlign: 'right'
  }
})

class CommentForm extends React.Component {
  static propTypes = {
    parent: PropTypes.string,
    id: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    classes: PropTypes.object.isRequired,
    newComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      body: props.body,
      author: props.author
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { body, author } = this.state
    const { newComment, editComment, parent, id } = this.props
    // the form is the same for adding new comment or editing old
    id ? editComment({ id, body, author }) :
      newComment(body, author, parent)
    this.setState({
      body: '', author: ''
    })
  }

  render() {
    const { classes } = this.props
    const { author = '', body = '' } = this.state
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={8}>
              <TextField
                id='author'
                label='Author'
                className={classes.textField}
                value={author}
                onChange={this.handleChange('author')}
                margin='normal'
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='body'
                label='Comment'
                multiline
                fullWidth
                value={body}
                onChange={this.handleChange('body')}
                className={classes.textField}
                margin='normal'
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.right}>
                <Button
                  type='submit'
                  className={classes.button}
                  raised color='primary'>
                  <Done className={classes.leftIcon} />
                  Post
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ newComment, editComment }, dispatch)

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(CommentForm)
