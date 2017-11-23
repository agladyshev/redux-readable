import { uuidv4 } from './helpers.js'

export const fetchPosts = () => {
  return fetch(
    'http://localhost:3001/posts',
    { headers: { Authorization: 'whatever-you-want' } })
    .then((res) => res.json())
}

export const fetchCategories = () => {
  return fetch(
    'http://localhost:3001/categories',
    { headers: { Authorization: 'whatever-you-want' } })
    .then((res) => res.json())
}

export const fetchComments = (id) => {
  return fetch(
    `http://localhost:3001/posts/${id}/comments`,
    { headers: { Authorization: 'whatever-you-want' } })
    .then((res) => res.json())
}

export const fetchPostsByCategory = (category) => {
  return fetch(
    `http://localhost:3001/${category}/posts`,
    { headers: { Authorization: 'whatever-you-want' } })
    .then((res) => res.json())
}

export const fetchPost = (id) => {
  return fetch(
    `http://localhost:3001/posts/${id}`,
    { headers: { Authorization: 'whatever-you-want' } })
    .then((res) => res.json())
}

export const fetchComment = (id) => {
  return fetch(
    `http://localhost:3001/comments/${id}`,
    { headers: { Authorization: 'whatever-you-want' } })
    .then((res) => res.json())
}

export const newPost = (post) => {
  return fetch(
    `http://localhost:3001/posts`,
    { headers: { 'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    })
    })
    .then((res) => res.json())
}

export const editPost = (post) => {
  const { id, body, title, category, author } = post
  return fetch(
    `http://localhost:3001/posts/${id}`,
    { headers: {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title: title,
      body: body,
      author: author,
      category: category
    })
    })
    .then((res) => res.json())
}

export const deletePost = (id) => {
  return fetch(
    `http://localhost:3001/posts/${id}`,
    { headers: { Authorization: 'whatever-you-want' },
      method: 'DELETE'
    })
    .then((res) => res.json())
}

export const votePost = (id, option) => {
  return fetch(
    `http://localhost:3001/posts/${id}`,
    { headers: {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      option: option
    })
    })
    .then((res) => res.json())
}

export const newComment = (body, author, parent) => {
  return fetch(
    `http://localhost:3001/comments`,
    { headers: {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      id: uuidv4(),
      parentId: parent,
      timestamp: Date.now(),
      body: body,
      author: author
    })
    })
    .then((res) => res.json())
}

export const deleteComment = (id) => {
  return fetch(
    `http://localhost:3001/comments/${id}`,
    { headers: { Authorization: 'whatever-you-want' },
      method: 'DELETE'
    })
    .then((res) => res.json())
}

export const editComment = (comment) => {
  const { id, body, author } = comment
  return fetch(
    `http://localhost:3001/comments/${id}`,
    { headers: {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      body: body,
      author: author,
      timestamp: Date.now()
    })
    })
    .then((res) => res.json())
}

export const voteComment = (id, option) => {
  return fetch(
    `http://localhost:3001/comments/${id}`,
    { headers: {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      option: option
    })
    })
    .then((res) => res.json())
}
