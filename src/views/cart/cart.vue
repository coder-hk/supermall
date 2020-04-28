<template>
  <div id="cart">
    <nav-bar class="cartNavBar" >
        <template #center>购物车({{cartItemLength}})</template>
        <template #right v-if="!isChecked">
          <img src="~assets/img/cart/cart-detail.svg" alt="详情选项" class="cart-detail" @click="spinner">
        </template>
    </nav-bar>
    <div class="spinner" >
      <div class="imgContainer" @click="hideSpinner">
        <img src="~assets/img/cart/cart-detail-active.svg" class="maskImg" v-show="isChecked">
      </div>
      <ul>
      	<li ><span v-show="isChecked" @click="jumpToDetail">详情</span></li>
      </ul>
    </div>
    <scroll class="content" ref='scroll'>
      <cart-list />
    </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartList from './childCompos/CartList.vue'
  import CartBottomBar from './childCompos/CartBottomBar.vue'
  export default {
    name:'cart',
    data() {
      return {
        isChecked: false,
      }
    },
    components:{
      NavBar,
      Scroll,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        cartItemLength : 'cartListLen'
      })
    },
    activated(){
      this.$refs.scroll.refresh()
      this.hideSpinner()
    },
    deactivated() {
      this.getSpinnerDOM().transition = ''
    },
    methods:{
      spinner(){
        this.isChecked = true
        this.getSpinnerDOM().transition = 'all 0.1s linear'
        if(this.isChecked){
          this.getSpinnerDOM().width = "60px"
        }else{
          this.getSpinnerDOM().width = 0
        }
      },
      hideSpinner(){
        this.getSpinnerDOM().width = 0
        this.isChecked = false
      },
      jumpToDetail(){
      if(this.$store.state.iid.length != 0){
          this.$router.push({
          path:'detail',
          query:{
            iid:this.$store.state.iid
          }
        })
      }else{
          window.alert("你还未浏览商品详情页")
      }

      },
      getSpinnerDOM(){
        return document.getElementsByClassName('spinner')[0].style
      }
    }
  }
</script>

<style scoped>
  #cart{
    height: 100vh;
  }
  .cartNavBar{
    color: #fff;
    background:var(--color-tint);
  }
  .content{
    height: calc(100% - 45px - 44px - 40px);
  }
  .cart-detail{
    width: 60%;
    height: 60%;
    vertical-align: middle;
  }
  .spinner{
    width: 0px;
    background: #ff8198;
    position: fixed;
    right: 0;
    top: 0px;
    /* transition: all 0.1s linear; */
    z-index: 99;
  }
  .imgContainer{
    width: 60px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .maskImg{
    flex:1;
    width: 60%;
    height: 60%;
  }
  ul,li{
    list-style-type: none;
    text-align: center;
    font-size: 13px;
  }
  .spinner ul>li{
    color: #fff;
    height: 30px;
    line-height: 30px;
  }
</style>
