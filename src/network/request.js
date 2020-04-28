import axios from 'axios'
//axios封装
export function request(config){
    //创建axios实例
    const instance = axios.create({
      baseURL:'', //接口主要路径，为空则取不到数据，获取接口请看README.md文件
      timeout:15000
    })
    //axios拦截器,请求拦截
    instance.interceptors.request.use(config=>{
      // console.log(config);
      //可以在里面做的操作
      //1.过滤config中的信息2.比如每次发送请求都要在界面中显示一个图标3.默写网络请求（比如登录token），必须携带一些特殊信息
      return config //记得返回

    },err=>{
      console.log(err);
    })
    //响应拦截
    instance.interceptors.response.use(res=>{
      // console.log(res);
      return res.data
    },err=>{
      console.log(err);
    })
    //发送真正的网络请求
    return instance(config)
}
