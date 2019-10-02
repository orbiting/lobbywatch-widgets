const express = require('express')
const next = require('next')
const { join } = require('path')

const port = +process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

if (dev || process.env.DOTENV) {
  require('dotenv').config()
}

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use('/build', express.static(join(__dirname, '..', 'build')))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
