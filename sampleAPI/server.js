const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Define custom routes (routes.json)
const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json')));
server.use(jsonServer.rewriter(routes));

// Add custom middleware before JSON Server router
server.use((req, res, next) => {
    console.log('REQUEST: ', req)
    // console.log('RESPONSE: ', res)
    req.header['X-Hello1'] ='World'
    res.header('X-Hello2', 'World')
    next()
});

const router = jsonServer.router(path.join(__dirname, 'db.json'));
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running')
});