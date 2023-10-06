const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

// Placeholder arrays for users and posts (replace this with a database)
const users = []
const posts = []

// User Sign-Up API
app.post('/api/signup', (req, res) => {
  const {name, email} = req.body

  if (!name || !email) {
    return res.status(400).json({error: 'Name and email are required'})
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  }

  users.push(newUser)

  return res
    .status(200)
    .json({message: 'User signed up successfully', user: newUser})
})

// Create Post API
app.post('/api/posts', (req, res) => {
  const {userId, content} = req.body

  if (!userId || !content) {
    return res.status(400).json({error: 'User ID and content are required'})
  }

  const userExists = users.some(user => user.id === userId)

  if (!userExists) {
    return res.status(404).json({error: 'User not found'})
  }

  const newPost = {
    id: posts.length + 1,
    userId,
    content,
  }

  posts.push(newPost)

  return res
    .status(200)
    .json({message: 'Post created successfully', post: newPost})
})

// Delete Post API
app.delete('/api/deletepost/:postId', (req, res) => {
  const postId = parseInt(req.params.postId)

  if (Number.isNaN(postId)) {
    return res.status(400).json({error: 'Invalid post ID'})
  }

  const postIndex = posts.findIndex(post => post.id === postId)

  if (postIndex === -1) {
    return res.status(404).json({error: 'Post not found'})
  }

  posts.splice(postIndex, 1)

  return res.status(200).json({message: 'Post deleted successfully'})
})

// Fetch User's Posts API
app.get('/api/posts/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)

  if (Number.isNaN(userId)) {
    return res.status(400).json({error: 'Invalid user ID'})
  }

  const userPosts = posts.filter(post => post.userId === userId)

  return res.status(200).json({posts: userPosts})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
