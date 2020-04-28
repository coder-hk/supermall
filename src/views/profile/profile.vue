<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">羊羊商城</div></nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <UserInfo>
     <template #user-icon>
       <img src="~assets/img/profile/y19.jpg" alt="头像" class="user-icon"> </template>
    </UserInfo>
    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <!--3.封装成一个整体-->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
   <a href="https://github.com/coder-hk/supermall" class="github">去GitHub查看代码</a>
  </div>
</template>

<script>
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'
  import NavBar from 'components/common/navbar/NavBar'
	export default {
		name: "profile",
    components: {
		  UserInfo, ListView, NavBar
    },
    data: function () {
		  return {
		    orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车',path:'/cart'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
          {icon: 'cube', iconColor: '#ff8198', info: '魔方图册Demo',path:'/PhotoAlbum'}
        ]
      }
    }
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .user-icon{
    width: 100%;
    height: 100%;
  }
  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
  .github{
    display: block;
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
