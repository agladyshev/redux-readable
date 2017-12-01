import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
// material-ui components
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
// own components
import PostSnippet from '../post/PostSnippet'
import { fetchPosts, fetchPostsByCategory } from './PostActions'

const styles = () => ({
  root: {
    'flex': '1 1 auto',
    'padding': '0.5rem',
    'overflow-x': 'hidden'
  }
})

class PostsGrid extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    fetchPostsByCategory: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      categoriesLoaded: new Set([])
    }
  }

  componentWillMount() {
    const { fetchPostsByCategory, fetchPosts } = this.props
    const { category } = this.props.match.params
    category ? fetchPostsByCategory(category) : fetchPosts()
  }

  componentWillReceiveProps(newProps) {
    const { fetchPostsByCategory, fetchPosts, categories } = newProps
    const { category } = newProps.match.params
    const { categoriesLoaded } = this.state
    if (!category) {
      // if 'all' categories selected, check that all are loaded
      if (categories.length !== categoriesLoaded.size) {
        // if some are missing, calculate which are missing
        const allCategories = new Set(categories.map(category => category.name))
        const missingCategories = new Set([...allCategories]
          .filter(category => !categoriesLoaded.has(category)))
        // if one category is missing, load just one, else load all
        // we can change the condition depending on the number of categories
        // if there are many cats but few missing
        // we can loop through missing set and load one by one
        missingCategories.size === 1 ?
          fetchPostsByCategory(category) : fetchPosts()
        this.setState({
          categoriesLoaded: allCategories
        })
      }
    } else {
      // if single category selected, check if store has it already
      if (!categoriesLoaded.has(category)) {
        fetchPostsByCategory(category)
        this.setState((prevState) => ({
          categoriesLoaded: new Set(prevState.categoriesLoaded.add(category))
        }))
      }
    }
  }

  render() {
    const { classes, posts } = this.props
    const postsRendered = []
    for (const post of posts) {
      const { author, body, commentCount, timestamp, title, voteScore, id } = post
      postsRendered.push(
        <PostSnippet
          author={author}
          body={body}
          commentCount={commentCount}
          timestamp={timestamp}
          title={title}
          voteScore={voteScore}
          id={id}
          key={id} />
      )
    }

    return (
      <div className={classes.root}>
        <Grid container
          spacing={8}
          direction='column'
          justify='flex-start'
          alignItems='stretch'
        >
          {postsRendered}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, categories, sort }, { match }) => {
  const category = match.params.category
  // convert store map to single array
  // filter deleted posts before storage gets updated
  const postsArray = Array.from(posts, array => array[1]).filter(post => !post.deleted)
  postsArray.sort((a, b) => b[sort] - a[sort])
  return !category ? {
    posts: postsArray,
    categories: categories
  } : {
    posts: postsArray.filter(post => post.category === category),
    categories: categories
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchPostsByCategory, fetchPosts }, dispatch)

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(PostsGrid)
