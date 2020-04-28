<template>
  <div id="car-bottom-bar">
    <check-button class="bottom-bar-checked-button" v-model="isAllChecked"  @click.native="checkedAllProducts"/>
    <div class="comment">全选</div>
    <div class="total">合计:{{totalPrice}}</div>
    <div class="remove" @click="removeCheckedPro">删除({{getRemovedProNums}})</div>
    <div class="calcBtn" @click="judgeIsEmpty">去计算({{getProNums}})</div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { remove } from 'common/util'
  export default {
    name:'CarBottomBar',
    components:{
      CheckButton
    },
    methods:{
      checkCartListLen(){
        if( this.cartList.length == 0 ){
          this.$toast.popup("购物车为空",1500)
          return 0
        }return 1
      },
      checkedAllProducts(){
        if(this.isAllChecked){
          this.cartList.forEach(val=>val.checked = false)
        }else{
          this.cartList.forEach(val=>val.checked = true)
        }
      },
      removeCheckedPro(){
        //删除ckecked的商品
        if( ! this.checkCartListLen() ){
          return
        }
        if ( ! this.getRemovedProNums  ) {
          this.$toast.popup("你还没有勾选商品",1500)
          return
        }
        let len = this.cartList.length
        for (let index = 0, spliceIndex = 0;index < len;index++,spliceIndex++){
          if (this.cartList[spliceIndex].checked == true)
          {
              this.cartList.splice(spliceIndex,1)
              spliceIndex--
          }
        }
      },
      judgeIsEmpty(){
        if( ! this.checkCartListLen() ){
          return
        }if( ! this.getRemovedProNums ){
          this.$toast.popup("您还没有勾选商品",1500)
        }
      }
    },
    data() {
      return {
        cartList: this.$store.state.cartList,
      }
    },
    computed:{
      getProNums(){
        if( this.cartList.length != 0 ){
          return this.cartList.reduce((prev,next)=>{
            if(next.checked == true){
              return prev + next.count
            }else{
              return prev
            }
          },0)
        }return 0
      },
      totalPrice(){
        if( this.cartList.length != 0 ){
          return '￥' + this.cartList.reduce((prev,next)=>{
            if(next.checked == true){
              return prev + next.count * next.realPrice
            }else{
              return prev
            }
          },0).toFixed(2)
        }
      },
      isAllChecked(){
        if (this.cartList.length != 0){
          return !this.cartList.find(val =>!val.checked)
        }else
          return false
      },
      getRemovedProNums(){
        if (this.cartList.length ==0 ) return 0
        else return this.cartList.filter(val => val.checked == true).length

      }
    },
  }
</script>

<style scoped>
  #car-bottom-bar{
    height: 40px;
    width: 100%;
    background-color: rgb(240,240,240);
    display: flex;
  }
  .bottom-bar-checked-button{
    margin-left: 3%;
    width: 7%;
    align-self: center;
  }
  .comment{
    width: 13%;
    line-height: 40px;
  }
  .total{
    flex:1;
    line-height: 40px;
    text-align: left;
  }
  .calcBtn,.remove{
    align-self: center;
    border-radius: 30px;
    font-size: 13px;
    width: 20%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .remove{
    color: #fff;
    border:1.5px solid #ff0000;
    background-color: #ff0000;
  }
  .calcBtn{
    color: #fff;
    border:1.5px solid orange;
    background-color: orange;
    margin-left: 3%;
  }
</style>
