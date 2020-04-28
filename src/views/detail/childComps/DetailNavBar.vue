<template>
    <nav-bar class="detailNavBar">
      <template #left>
        <div class="backImg" @click="backClick">
            <img src="~assets/img/common/back.svg" >
        </div>
      </template>
      <template #center>
        <tab-control :titles='["商品","参数","评论","推荐"]'  ref='tabControl' />
      </template>
      <template #right>
        <img src="~assets/img/detail/shopcart.svg" class="shopCart" @click='jumpCart'>
      </template>
    </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/TabControl'
  export default {
    name:'DetailNavBar',
    props:{
      iid:{
        type:String,
        default:''
      }
    },
    components:{
      NavBar,
      TabControl
    },
    methods:{
      backClick(){
        this.$router.back();
      },
      jumpCart(){
        this.$store.state.iid = this.iid
        this.$router.replace("/cart")
      }
    }
  }
</script>

<style scoped>
  .backImg{
    margin-top:6px;
  }
  .detailNavBar{
    background:#fff;
  }
  .shopCart{
    width: 60%;
    height: 60%;
    vertical-align: middle;
  }
</style>
