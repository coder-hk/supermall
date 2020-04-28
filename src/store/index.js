import Vue from 'vue'
import Vuex from 'vuex'
import {
  ADD_TO_CART,
  ADD_COUNTER
} from './mutationsTypes'
Vue.use(Vuex)
// mutations唯一的目的就是修改state中的状态
// mutations中的每个方法尽量完成的事件比较单一点
// actions里不要直接修改state的值，可以通过commit把事件和对象传给moutations 执行
//组件中传事件给vuex用dispatch
const state = {
  cartList : [],
  iid:''
}
const mutations = {
  [ADD_COUNTER](state,info){
    info.count += 1
  },
  [ADD_TO_CART](state,info){
    info.count = 1
    state.cartList.push(info)
  }
}
const actions = {
  addCart({commit,state},info){
    return new Promise((resolve,reject)=>{
      const oldProduct = state.cartList.find(item =>
      info.iid === item.iid)
      if(oldProduct){
        commit("addCounter",oldProduct) //传事件给mutations
        resolve("商品数量加1")
      }else{
        commit("addToCart",info) //传事件给mutations
        resolve("添加购物车成功")
      }
    })

  }
}
const getters = {
  cartList(state){
    return state.cartList
  },
  cartListLen(state){
    return state.cartList.length
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
