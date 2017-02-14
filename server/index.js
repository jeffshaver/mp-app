require('dotenv').config({path: '../.env', silent: true})

const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const serveStatic = require('serve-static')

const port = process.env.PORT || 3000
const apiAddress = process.env.API_ADDRESS
  ? process.env.API_ADDRESS
  : ''
const app = express()

/* eslint-disable quotes */
const csp = [
  "default-src 'none'",
  `connect-src 'self' ${apiAddress}`,
  "font-src 'self'",
  "img-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'"
].join('; ')
/* eslint-enable quotes */

app.use(compression())
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', csp)

  next()
})

app.use('/static', serveStatic(path.join(__dirname, '../build/static')))
app.use('/default.css', serveStatic(path.join(__dirname, '../build/default.css')))
app.use('/fonts.css', serveStatic(path.join(__dirname, '../build/fonts.css')))
app.use('/reset.css', serveStatic(path.join(__dirname, '../build/reset.css')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port)

/* eslint-disable no-console */
console.log(`Running a production ready app server at localhost:${port}`)
/* eslint-enable no-console */