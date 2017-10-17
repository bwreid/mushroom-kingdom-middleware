const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')

app.use(morgan('dev'))

const party = [
  { id: 1, name: 'Mario' }
]

// middleware example
app.use((req, res, next) => {
  console.log('I am middleware')
  next()
})

app.get('/party', (req, res, next) => {
  res.json(party)
})

app.get('/party/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const result = party.find(partier => partier.id === id)
  if (result === undefined) return next({ status: 404, message: 'did not find it' })
  res.json({ result })
})

app.get('/ping', (req, res) => {
  res.json({ message: 'pong!' })
})

app.get('/boom', (req, res) => {
  throw Error('!!!!!!!!')
})

app.get('/hello/:name', (req, res, next) => {
  res.json({ message: `Hello ${req.params.name}!` })
})

app.get('/hello/friend', (req, res, next) => {
  res.json({ message: `Hi there friend!` })
})

app.use((err, req, res, next) => {
  console.log(err.status)
  res.status(err).json({ error: err })
})

app.use((req, res) => {
  res.status(404).json({ error: { message: 'Not found!' }})
})

const listener = () => console.log(`You're listening on port ${port}. 🌈`)
app.listen(port, listener)
