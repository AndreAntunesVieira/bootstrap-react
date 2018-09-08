const fs = require('fs')
const routes = require('./pages/_routes')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const fastify = require('fastify')
const Next = require('next')
const app = Next({ dev })
const handler = routes.getRequestHandler(app)
const babel = require('babel-core')

app.prepare()
  .then(() => {
    const server = fastify()

    server.get('/samples/*', (req, res) => {
      if (isJs(req)) {
        return sendJs(req, res)
      }
      return sendHtml(req, res)
    })

    server.get('/*', (req, res) => handler(req.req, res.res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })


function isJs (req) {
  const path = req.params['*']
  return /.*\.js$/.test(path)
}

function sendJs (req, res) {
  res.type('text/plain; charset=utf-8').code(200)
  const path = req.params['*']
  return fs.readFile(`${__dirname}/samples/${path}`, 'utf8', (e, content) => {
    return res.send(babel.transform(content, { presets: 'react' }).code)
  })
}

function sendHtml (req, res) {
  res.type('text/html').code(200)
  const path = req.params['*']
  return fs.readFile(`${__dirname}/samples/${path}/index.html`, 'utf8', (e, content) => {
    return res.send(content)
  })
}
