<template>
  <div id="shop-item" >
    <div class="item-selector">
      <CheckButton @checkBtnClick="checkedChange" v-model="itemInfo.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imgUrl" alt="商品图片" @click="jumpToCurPro">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">¥{{itemInfo.realPrice}}</div>
        <div class="item-count">
          <input type="button" value="-" class="left" @click="decrement">
          <div class="number left">{{itemInfo.count}}</div>
          <input type="button" value="+" class="right" @click="increment">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  export default {
    name: "CartListItem",
    props: {
      itemInfo: Object
    },
    components: {
      CheckButton
    },
    methods: {
      checkedChange(){
        this.itemInfo.checked = !this.itemInfo.checked;
      },
      increment(){
        this.itemInfo.count++
      },
      decrement(){
        if(this.itemInfo.count > 0)
          this.itemInfo.count--
      },
      jumpToCurPro(){
        this.$router.push({
          path:'detail',
          query:{
            iid:this.itemInfo.iid
          }
        })
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
    flex: 2;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .item-count .number{
    text-align: center;
    width: 50px;
    border:1px solid #EEEEEE;
  }
  .item-count input{
    width: 20px;
    height: 20px;
    background: #EEEEEE;
    border: none;
    outline: none;
  }
</style>
