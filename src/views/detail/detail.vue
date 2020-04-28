<template>
  <div id='detail'>
    <detail-nav-bar ref='nav' :iid="iid"/>
    <scroll class="content" ref='scroll' @distanceY="adjustChecked" :probeType=3>
      </ul>
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detailInfo='detailImage' @lastImgLoad="detailImgLoad" />
      <detail-param-info :paramInfo="itemParams" ref="params"/>
      <detail-comment-info :commentInfo="detailComment" ref="comment"/>
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>
    <back-top v-show="show" @click.native="backToFunc()"/>
    <detail-bottom-bar @addToCart="appendToCart" class="detail-bottom-bar"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import GoodsList from 'components/content/goodsList/GoodsList'
  import {imgLoadMixIn,debounce,backTopMixIn} from 'common/util'
  import BackTop from 'components/common/backtop/BackTop'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import { mapActions } from 'vuex'
  export default {
    name:'detail',
    data(){
      return{
        iid:'',
        banners:[],
        goods:{},
        shop:{},
        detailImage:{},
        itemParams:{},
        detailComment:{},
        recommend:[],
        distanceList:[],
        func1:()=>{},
        refresh:()=>{},
        currentIndex:0,
        popup:function(){}
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      BackTop,
      DetailBottomBar
    },
    created() {
      this.popup = debounce(this.$toast.popup,500)
      this.iid = this.$route.query.iid;
      getDetail(this.iid).then(res=>{
        const data = res.result
        this.banners = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailImage = data.detailInfo
        this.itemParams = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        this.detailComment = data.rate.list[0]
      }).catch(err=>{
        console.log(err);
      })
      getRecommend().then(res=>{
        const recommendData = res.data.list
        this.recommend = recommendData
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{
      ...mapActions(['addCart']),
      adjustChecked(position){
        for(let i=0;i<this.distanceList.length;i++){
          //hack写法原数组中添加一个相对大的值，减少判断表达式，提高运行性能
              if(this.currentIndex !== i && (i < this.distanceList.length-1 && this.distanceList[i+1]<position.y && position.y<=this.distanceList[i])){
                this.currentIndex = i
                this.$refs.nav.$refs.tabControl.currentIndex = i
                console.log(this.currentIndex )
              }
        }
        this.show=Math.abs(position.y) > 1000
        },
        convertTrueNum(num){
          return -(num-44)
        },
        detailImgLoad(){
          this.refresh()
          this.func1()
        },
        appendToCart(){
          const cartProduct = {}
          cartProduct.iid = this.iid
          cartProduct.realPrice = this.goods.nowPrice
          cartProduct.desc = this.goods.desc
          cartProduct.imgUrl = this.banners[0]
          cartProduct.title = this.goods.title
          cartProduct.count = 0
          cartProduct.checked = false
          // this.$store.dispatch('addCart', cartProduct).then(res=>{
          //   //Toast弹窗显示结果,一般实现
          //   console.log(res);
          // })

          this.addCart(cartProduct).then(res=>{
            this.popup(res,1500)
          })
        }
    },
    mixins:[imgLoadMixIn,backTopMixIn],
    mounted(){
      //详情页监听GoodListItem图片加载完成
      // let refresh = debounce(()=>{
      //   this.$refs.scroll.refresh()
      //   console.log(this);
      // }, 500)
      //   this.$bus.$on('detailImgOneLoad',()=>{
      //     refresh()//防抖
      //   })
        //第二种方案 混入
        this.$bus.$on('tabClick',this.backToFunc)
        let func = debounce(()=>{
          this.distanceList = []
          this.distanceList.push(0)
          this.distanceList.push(this.convertTrueNum(this.$refs.params.$el.offsetTop) )
          this.distanceList.push(this.convertTrueNum(this.$refs.comment.$el.offsetTop) )
          this.distanceList.push(this.convertTrueNum(this.$refs.recommend.$el.offsetTop) )
          let eleArr = document.getElementsByClassName('goods-item');
          let lastEle = eleArr[eleArr.length-1]
          this.distanceList.push(-lastEle.offsetTop-270 )

          },300)

        let refreshFunc = debounce(this.$refs.scroll.refresh,300)
        this.func1 = ()=>{func()}
        this.refresh = ()=>{ refreshFunc() }
    },
    beforeDestroy() {
      this.$bus.$off('imgOneLoad',this.itemImgListener)
      //取消监听事件总线的imgoneload事件。
      // this.$bus.$off('recommendImgLoad',this.func1)
      this.$bus.$off('tabClick',this.backToFunc)
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    background: #fff;
    height: 100vh;
  }
  .detail-bottom-bar{
    z-index: 9;
  }

  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
