const routes = require('./pages/_routes')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const fastify = require('fastify')
const Next = require('next')
const app = Next({ dev })
const handler = routes.getRequestHandler(app)

openServer()

async function openServer(){
  await app.prepare()
  const server = fastify()
  server.get('/*', (req, res) => handler(req.req, res.res))
  server.listen(port, serverFeedback)
}

function serverFeedback(err){
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
}
