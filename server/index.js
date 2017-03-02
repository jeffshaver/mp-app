require('dotenv').config({path: '../.env', silent: true})

const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const serveStatic = require('serve-static')
const httpProxy = require('express-http-proxy')

const port = process.env.PORT || 3000
const apiAddress = process.env.API_ADDRESS
  ? process.env.API_ADDRESS
  : ''
const app = express()

const csp = `
  default-src 'self';
  connect-src 'self'${' ' + apiAddress};
  font-src 'self' data:;
  img-src 'self';
  script-src 'self';
  style-src 'self' 'sha256-D8Sj8qhd4FvnVwN5w9riiArwsqYOEwHolv228Ic6Vqk=';
  worker-src 'self';
`.replace(/\n/g, '')

app.use(compression())
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', csp)

  next()
})

app.use('/static', serveStatic(path.join(__dirname, '../build/static')))
app.use('/sw.js', serveStatic(path.join(__dirname, '../build/sw.js')))
app.use('/default.css', serveStatic(path.join(__dirname, '../build/default.css')))
app.use('/fonts.css', serveStatic(path.join(__dirname, '../build/fonts.css')))
app.use('/reset.css', serveStatic(path.join(__dirname, '../build/reset.css')))

app.post('/api', httpProxy(apiAddress, {
  preserveHostHdr: true
}))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port)

/* eslint-disable no-console */
console.log(`Running a production ready app server at localhost:${port}`)
/* eslint-enable no-console */