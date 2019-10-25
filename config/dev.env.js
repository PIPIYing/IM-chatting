'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
/*  API_BASE: "/api/"   //此处配置本地环境接口基础路径，注意前后两个/符号别少了*/
})
