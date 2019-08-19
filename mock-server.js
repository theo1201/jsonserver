const jsonServer = require('json-server');
const ip = require('ip').address();
// mark：要提前创建db.js，返回我们的mock数据
const $db = require('./db');
// const $routeHandler = require('./routeHandler')
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
// 路由格式处理需要在server.use(router)之前
// server.use(jsonServer.rewriter($routeHandler($db)))
const router = jsonServer.router($db);

// Set default middlewares (logger, static, cors and no-cache)
 server.use(middlewares);
//  To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);
// 拦截客户端请求，进行自定义处理
server.use((req, res, next) => {
        // 手动映射，更改请求url（/steps/step1 => /steps_step1）
        req.url = req.url.replace(/\//g, '_').replace('_', '/');
        // 这里处理post请求
        if(req.method==='POST'){
            req.method = 'GET'
            req.query = req.body
        }
        next();
    });

server.use(router);
server.listen({
    host: ip,
    port: 3122
}, () => {     
//     console.log('JSON Server is running at 3001');
console.log(`JSON Server is running in http://${ip}:3122`);
});


