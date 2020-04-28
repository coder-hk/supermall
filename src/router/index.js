import Vue from 'vue'
import VueRouter from 'vue-router'
const home =()=>import('views/home/home')
const category =()=>import('views/category/category')
const profile =()=>import('views/profile/profile')
const cart =()=>import('views/cart/cart')
const detail = ()=>import('views/detail/detail')
const PhotoAlbum = ()=>import("views/profile/childComps/PhotoAlbum")
Vue.use(VueRouter)
//解决vue router连续点击多次路由报错解决方法
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home,
		meta:{
			title:'首页'
		}
  },
  {
    path:'/cart',
    component:cart,
		meta:{
			title:'购物车'
		}
  },
  {
    path:'/category',
    component:category,
		meta:{
			title:'分类'
		}
  },
  {
    path:'/profile',
    component:profile,
		meta:{
			title:'我的'
		}
  },
  {
    path:'/detail',
    component:detail,
		meta:{
			title:'详情'
    }
  },
  {
    path:'/photoAlbum',
    component:PhotoAlbum,
  	meta:{
  		title:'魔方图册'
    }
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})
router.beforeEach((to,from1,next)=>{
	document.title = to.matched[0].meta.title || '详情'
  next()
})
export default router
