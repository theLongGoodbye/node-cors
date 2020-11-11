// 引入express框架
const express = require("express");
const app = express();

// 引入代理中间件
const { createProxyMiddleware  } = require('http-proxy-middleware');

// 设置静态资源
// server.js 在哪个文件夹，哪个文件夹就是根目录
// index.html里面引用的 js 和 css 文件,就是相对于这个根目录
app.use(express.static(__dirname))

// 使用代理,设置代理规则
app.use('/', createProxyMiddleware({
    target: 'http://218.xxx.xxx.xx:xxxx/routejson',
    pathRewrite: {
        '^/api' : ''
    },
    changeOrigin: true
  
}));

app.listen(8082);
console.log("服务启动成功");

// 启动服务之后，直接在浏览器输入要访问的页面
// 比如 http://localhost:8082/static/index.html
// 再比如 http://localhost:8082/index2.html
// 设置好代理匹配规则，比如这里是将  /api 替换成  http://218.xxx.xxx.xx:xxxx/routejson
// 然后在页面里面发接口请求就行了