<template>
  <div id="home" >
    <nav-bar class="home-nav" @click.native="backToFunc()">
        <template #center>羊羊商城</template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="changeTabItem" v-show="tab1Show" ref="tabControl1" class="tab1"/>
    <scroll class="content" ref='scroll' :probeType="3" @distanceY="isShowBack" @pullingUp="loadMore">
      <home-swiper :banners="banners" ref="hSwiper" @swiperImgLoad="calcTabControlY" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view @finishPopLoad="recoculate"/>
      <tab-control :titles="['流行','新款','精选']" @tabClick="changeTabItem" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native='backToFunc()'  v-show="show" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata,
 getHomeGoods}
 from "network/home.js";
import { debounce,imgLoadMixIn,backTopMixIn} from 'common/util'
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/TabControl";
import GoodsList from 'components/content/goodsList/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backtop/BackTop'
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      item:'pop',
      tab1Show:false,
      tab2Top:0,
      saveY:0
    };
  },
  mixins:[imgLoadMixIn,backTopMixIn],
  created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
  },
  mounted(){
    //首页监听GoodListItem图片加载完成
      // let refresh = debounce(this.$refs.scroll.refresh,500)
      // this.$bus.$on('homeImgOneLoad',()=>{
      //   refresh()//防抖
      // })
      //第二种方案，使用混入mixin mixins:[imgLoadMixIn],
  },
  activated: function() {
    this.$refs.hSwiper.startTimer();
    this.$refs.scroll.refresh()
    this.$refs.scroll.backTo(0,this.saveY,0)
  },
  deactivated: function() {
    this.$refs.hSwiper.stopTimer()
    this.saveY = this.$refs.scroll.getPositionY()
    this.$bus.$off('imgOneLoad',this.itemImgListener)
    //取消监听事件总线的imgoneload事件。
  },
  methods:{
    /***
     *首页相关方法
     * */
    changeTabItem(index){
      this.item = Object.keys(this.goods)[index]
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    isShowBack(position){
      // console.log(position)
      let positionY = Math.abs(position.y)
      this.show = positionY > 1000
      this.tab1Show = positionY > this.tab2Top
    },
    loadMore(){
      // console.log("load more")
      this.getHomeGoods(this.item)
    },
    calcTabControlY(){
      this.tab2Top = this.$refs.tabControl2.$el.offsetTop
    },
    recoculate(){
      this.tab2Top = this.$refs.tabControl2.$el.offsetTop
    },
    /***
     *网络请求相关方法
     * */
    getHomeMultidata(){
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHomeGoods(type){
      let pages = this.goods[type].page+1
      getHomeGoods(type,pages).then(res=>{
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = pages
        this.$refs.scroll.scroll.finishPullUp()
      }).catch(err=>{
        console.log(err)
      })
    },

  },
  computed:{
    showGoods(){
      return this.goods[this.item].list
    },
  }

};
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.home-nav {
  /* z-index: 9; */
  color: #fff;
  background-color: var(--color-tint);
}
.tab1{
  position: relative;
  top: -0.1%;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 45px;
  overflow: hidden;
}

</style>
