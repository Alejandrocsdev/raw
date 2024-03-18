// MODULE
const http = require('http')
const path = require('path')
const fs = require('fs')
// MIDDLEWARE
const Middleware = require('./middleware')
const middleware = new Middleware()
const static = middleware.static('public')
// SERVER
const port = 3000
const server = http.createServer()
server.on('request', requestListener)

const htmlFile = path.resolve(__dirname, 'views', 'index.html')
const html = fs.readFileSync(htmlFile, 'utf8')

function requestListener(request, response) {
  const urlPath = request.url
  const suffix = Number(path.basename(urlPath))
  response.setHeader('Access-Control-Allow-Origin', '*')
  static(request, response, () => {
    if (urlPath === '/') {
      response.writeHead(302, { Location: '/restaurants' })
      response.end('<h1>This is the root</h1>')
    } else if (urlPath === '/restaurants') {
      response.end(html)
    } else if (urlPath === `/restaurants/${suffix}`) {
      response.end(`Restaurants ${suffix} Detail`)
    } else {
      response.writeHead(404)
      response.end('<h1>Not Found</h1>')
    }
  })
}

server.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})
