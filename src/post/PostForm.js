import React from 'react'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// material-ui components
import { withStyles } from 'material-ui/styles'
import { Paper, Grid, Button, TextField, Select } from 'material-ui'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Done from 'material-ui-icons/Done'
// own components
import { fetchPost, newPost, editPost } from './PostActions'
import { capitalize } from '../app/helpers'

const styles = theme => ({
  paper: {
    padding: 16,
    color: theme.palette.text.secondary
  },
  root: {
    'flex': '1 1 auto',
    'overflow-x': 'hidden'
  },
  right: {
    textAlign: 'right'
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  formControl: {
    minWidth: 120
  }
})

class Post extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    classes: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      body: props.body,
      author: props.author,
      category: props.category
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
    const { title, body, author, category } = this.state
    const { history, editPost, newPost, id } = this.props
    id ? editPost({ title, body, author, category, id })
      : newPost({ title, body, author, category })
    history.push('/')
  }

  componentWillMount() {
    const { id, title, fetchPost } = this.props
    // if post exists but not loaded, fetch it from server
    id && !title && fetchPost(id)
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.title,
      body: newProps.body,
      author: newProps.author,
      category: newProps.category
    })
  }

  render() {
    const { classes, categories } = this.props
    const { title, author, body, category } = this.state
    const categoriesMenu = []
    for (const category of categories) {
      const { name } = category
      const label = capitalize(name)
      categoriesMenu.push(
        <MenuItem
          value={name}
          key={name}>
          {label}
        </MenuItem>
      )
    }
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                id='title'
                label='Title'
                className={classes.textField}
                fullWidth
                value={title}
                onChange={this.handleChange('title')}
                margin='normal'
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='body'
                label='Post'
                multiline
                fullWidth
                value={body}
                onChange={this.handleChange('body')}
                className={classes.textField}
                margin='normal'
                required={true}
              />
            </Grid>
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
            <Grid item xs={7}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='category'>Category</InputLabel>
                <Select
                  value={category}
                  onChange={this.handleChange('category')}
                  input={<Input id='category' />}
                  required={true}
                >
                  {categoriesMenu}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <div className={classes.right}>
                <Button type='submit' className={classes.button} raised color='primary'>
                  <Done className={classes.leftIcon} />
                  Done
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
    )
  }
}

const mapStateToProps = ({ posts, categories }, { match, history }) => {
  const id = match.params.id
  match.params.id && !posts.has(id) && history.push('/page-not-found')
  const { body = '',
    title = '',
    author = '',
    category = '',
    deleted = false } = posts.has(id) || {}
  // convert map object to simple array and filter deleted posts
  deleted && history.push('/page-not-found')
  return {
    title: title,
    body: body,
    author: author,
    category: category,
    categories: categories,
    id: id
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editPost, newPost, fetchPost }, dispatch)

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Post)
