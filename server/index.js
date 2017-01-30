const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const serveStatic = require('serve-static')

const port = process.env.PORT || 3000

const app = express()

app.use(compression())
app.use(morgan('dev'))

app.use('/static', serveStatic(path.join(__dirname, '../build/static')))
app.use('/fonts.css', serveStatic(path.join(__dirname, '../build/fonts.css')))
app.use('/reset.css', serveStatic(path.join(__dirname, '../build/reset.css')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port)

/* eslint-disable no-console */
console.log(`Running a production ready app server at localhost:${port}`)
/* eslint-enable no-console */