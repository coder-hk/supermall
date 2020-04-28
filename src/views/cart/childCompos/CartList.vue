<template>
  <div>
    <div v-if="cartList.length == 0" class="emptyCart">购物车没有商品!</div>
    <CartListItem v-else v-for="(item,index) in cartList" :itemInfo="item" :key="index"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CartListItem from './CartListItem.vue'
  export default {
    name:'CartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    components:{
      CartListItem
    }
}
</script>

<style scoped>
  .emptyCart{
    font-size: 16px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #666;
  }
</style>
