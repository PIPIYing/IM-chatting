'use strict'
import axios from 'axios'
import qs from 'qs'  //用于表单提交数据格式

/*let env = process.env.NODE_ENV;
let root = '';
let loading;

if (env === 'development') {
  console.log("api");
} else if (env === 'production') {
  console.log("pro");
  root = '';
} else {
  throw '请检查process.env.NODE_ENV的值，是否符合这些值之一：development，production';
}*/

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

let axios = Axios.create({
  baseURL: 'http://47.97.214.92:8080/CloudServer/user',
  timeout: 10000, //请求超时的时间限制
  headers: {'Content-Type': 'application/x-www.form-urlencoded'}, //设置默认请求头
  withCredentials: true //cookies存储
})



/*
* 封装 axios.get 请求
* @param {String} url [请求url地址]
* @param {Object} url [请求携带参数]
* */
export function get(rul,params){
    return new Promise((resolve,reject)=>{
      axios.get(url,{
        params:params
      }).then((res)=>{
        resolve(res.data)
      }).catch((err)=>{
        reject(err.data);
      })
    })
  }
//get的第二个参数是一个{}，然后这个对象的params属性值是一个参数对象的

/*
* 封装 axios.post 请求
* @param {String} url [请求url地址]
* @param {Object} url [请求携带参数]
* */
export function post(url,params){
    return new Promise((resolve,reject)=>{
      axios.post(url,qs.stringify(params))
        .then((res)=>{
        resolve(res.data)
      }).catch((err)=>{
        reject(err.data);
      })
    })
  }
//post的第二个参数就是一个参数对象

export {get,post}
