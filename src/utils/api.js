export function fetchPosts () {
	return fetch(
		'http://localhost:3001/posts',
		{ headers: { 'Authorization': 'whatever-you-want' }})
		.then((res) => res.json())
}

export function fetchCategories () {
	console.log("fetch")
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