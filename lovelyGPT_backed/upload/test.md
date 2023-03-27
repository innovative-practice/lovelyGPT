起步
基于promise可以用于浏览器和node.js的网络请求库

Axios 是什么?
Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。 它是 isomorphic 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js http 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

特性
从浏览器创建 XMLHttpRequests
从 node.js 创建 http 请求
支持 Promise API
拦截请求和响应
转换请求和响应数据
取消请求
自动转换JSON数据
客户端支持防御XSRF
安装
使用 npm:

$ npm install axios
使用 bower:

$ bower install axios
使用 yarn:

$ yarn add axios
使用 jsDelivr CDN:

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
使用 unpkg CDN:

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
