import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'
import Done from 'material-ui-icons/Done'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'

import { compose } from 'redux' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPost, fetchComments, fetchCategories, newPost } from '../actions'

import Comment from './Comment'

import { capitalize } from '../utils/helpers'

const styles = theme => ({
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
  },
  root: {
    flex: '1 1 auto',
    // margin: '1rem',
    'overflow-x': 'hidden',
  },
  right: {
    textAlign: 'right'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
  },
});

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
      category: props.category,
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
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault()
    console.log(this.state)
    console.log(this.props.id)
    const { title, body, author, category} = this.state
    const { dispatch, id } = this.props
    if (this.props.id) {
      console.log('edit post')
    } else {
      console.log('new post')
      dispatch(newPost({ title, body, author, category }))
    }
  }

  componentWillMount() {
    const { id, title, dispatch, categories } = this.props
    // if post exists but not loaded, fetch it from server
    // console.log(id && !title)
    id && !title && dispatch(fetchPost(id))
    // this might cause constant re-render if id is invalid
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.title,
      body: newProps.body,
      author: newProps.author,
      category: newProps.category,
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
    return(
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                id="title"
                label="Title"
                className={classes.textField}
                fullWidth
                value={title}
                onChange={this.handleChange('title')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={2} className={classes.right}>
              <h6><i className="material-icons">delete</i></h6>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="body"
                label="Post"
                multiline
                fullWidth
                value={body}
                onChange={this.handleChange('body')}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="author"
                label="Author"
                className={classes.textField}
                value={author}
                onChange={this.handleChange('author')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={8}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  value={category}
                  onChange={this.handleChange('category')}
                  input={<Input id="category" />}
                >
                {categoriesMenu}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.right}>
                <Button type="submit" className={classes.button} raised color="primary">
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

function mapStateToProps ({ posts, categories }, { match }) {
  const pathId = match.params.id
  const { body="", title="", author="", category="", id=pathId } = posts.has(pathId) ? posts.get(pathId) : {}
  return {
    title: title,
    body: body,
    author: author,
    category: category,
    categories: categories,
    id: id,
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(Post)