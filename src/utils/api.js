import { uuidv4 } from './helpers.js'

export function fetchPosts () {
  return fetch(
    'http://localhost:3001/posts',
    { headers: { 'Authorization': 'whatever-you-want' }})
    .then((res) => res.json())
}

export function fetchCategories () {
  return fetch(
    'http://localhost:3001/categories',
    { headers: { 'Authorization': 'whatever-you-want' }})
    .then((res) => res.json())
}

export function fetchComments (id) {
  return fetch(
    `http://localhost:3001/posts/${id}/comments`,
    { headers: { 'Authorization': 'whatever-you-want' }})
    .then((res) => res.json())
}

export function fetchPostsByCategory (category) {
  return fetch(
    `http://localhost:3001/${category}/posts`,
    { headers: { 'Authorization': 'whatever-you-want' }})
    .then((res) => res.json())
}

export function fetchPost (id) {
  return fetch(
    `http://localhost:3001/posts/${id}`,
    { headers: { 'Authorization': 'whatever-you-want' }})
    .then((res) => res.json())
}

export function fetchComment (id) {
  return fetch(
    `http://localhost:3001/comments/${id}`,
    { headers: { 'Authorization': 'whatever-you-want' }})
    .then((res) => res.json())
}

export function newPost (post) {
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

export function editPost (post) {
  const { id, body, title, category, author } = post
  return fetch(
    `http://localhost:3001/posts/${id}`,
    { headers: { 'Authorization': 'whatever-you-want',
                 'Content-Type': 'application/json' },
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