import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button'
import Done from 'material-ui-icons/Done'

import { compose } from 'redux' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPost, fetchComments } from '../actions'

import Comment from './Comment'

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
});

class Post extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    classes: PropTypes.object.isRequired
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
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  componentWillMount() {
    const { id, title, dispatch } = this.props
    // if post exists but not loaded, fetch it from server
    id && !title && dispatch(fetchPost(id))
    // this might cause constant re-render if id is invalid
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps)
    this.setState({
      title: newProps.title,
      body: newProps.body,
      author: newProps.author,
      category: newProps.category,
    })
  }

  render() {
    const { classes } = this.props
    const { title, author, body, category } = this.state
    console.log(this.state)
    return(
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={8}>
              <h3>{title}</h3>
            </Grid>
            <Grid item xs={4} className={classes.right}>
              <h6><i className="material-icons">delete</i></h6>
            </Grid>
          </Grid>
          <div>{body}</div>
          <Grid container>
            <Grid item xs={8}>
              <h5>
                {/*<i className="material-icons">create</i>*/}
                {author}
              </h5>
            </Grid>
            <Grid item xs={4} className={classes.right}>
              <Button className={classes.button} raised color="primary">
                <Done className={classes.leftIcon} />
                Done
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps ({ posts }, { match }) {
  const id = match.params.id
  const { body="", title="", author="", category="" } = posts.has(id) ? posts.get(id) : {}
  return {
    title: title,
    body: body,
    author: author,
    category: category,
    id: id,
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps),
)(Post)