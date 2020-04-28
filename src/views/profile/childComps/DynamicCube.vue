<template>
  <div id="wrap">
    <!--外层最大容器-->
    <div class="wrap"  >
        <!--包裹所有元素的容器-->
        <div class="cube" @click="enlarge">
            <!--前面图片 -->
            <div class="out_front" ref="outFront">
                <img src="~assets/img/YYImg/y1.jpg" class="pic" />
            </div>
            <!--后面图片 -->
            <div class="out_back" ref="outBack">
                <img src="~assets/img/YYImg/y2.jpg" class="pic" />
            </div>
            <!--左面图片 -->
            <div class="out_left" ref="outLeft">
                <img src="~assets/img/YYImg/y3.jpg" class="pic" />
            </div>
            <!--右面图片 -->
            <div class="out_right" ref="outRight">
                <img src="~assets/img/YYImg/y4.jpg" class="pic" />
            </div>
            <!--上面图片 -->
            <div class="out_top" ref="outTop">
                <img src="~assets/img/YYImg/y5.jpg" class="pic" />
            </div>
            <!--下面图片 -->
            <div class="out_bottom" ref="outBottom">
                <img src="~assets/img/YYImg/y13.jpg" class="pic" />
            </div>
          <!--小正方体 -->
            <span class="in_front">
                <img src="~assets/img/YYImg/y7.jpg" class="in_pic" />
            </span>
            <span class="in_back">
                 <img src="~assets/img/YYImg/y8.jpg" class="in_pic" />
            </span>
            <span class="in_left">
                <img src="~assets/img/YYImg/y9.jpg" class="in_pic" />
            </span>
            <span class="in_right">
                <img src="~assets/img/YYImg/y10.jpg" class="in_pic" />
            </span>
            <span class="in_top">
                <img src="~assets/img/YYImg/y11.jpg" class="in_pic" />
            </span>
            <span class="in_bottom">
                <img src="~assets/img/YYImg/y12.jpg" class="in_pic" />
            </span>
        </div>
    </div>
    <div @click="shrink" class="shrink">点我缩小</div>
    </div>
</template>

<script>
  export default {
    name:'DynamicCube',
    data() {
      return {
         outFront : {},
         outBack : {},
         outTop : {},
         outBottom : {},
         outLeft : {},
         outRight : {}
      }
    },
    activated(){
      this.$toast.popup("点击魔方会放大",1500)
      this.$nextTick(function(){
        this.outFront = this.$refs.outFront.style
        this.outBack = this.$refs.outBack.style
        this.outTop = this.$refs.outTop.style
        this.outBottom = this.$refs.outBottom.style
        this.outLeft = this.$refs.outLeft.style
        this.outRight = this.$refs.outRight.style
      })
    },
    methods:{
      enlarge(){
          this.outFront.transform = 'rotateY(0deg) translateZ(200px)'
          this.outBack.transform = 'translateZ(-200px) rotateY(180deg)'
          this.outTop.transform = 'rotateX(90deg) translateZ(200px)'
          this.outBottom.transform = 'rotateX(-90deg) translateZ(200px)'
          this.outLeft.transform = 'rotateY(-90deg) translateZ(200px)'
          this.outRight.transform = 'rotateY(90deg) translateZ(200px)'

      },
      shrink(){
        this.outFront.transform = ''
        this.outBack.transform = ''
        this.outTop.transform = ''
        this.outBottom.transform = ''
        this.outLeft.transform = ''
        this.outRight.transform = ''
      }
    }
  }
</script>

<style scoped>
 /*最外层容器样式*/
        #wrap{
          margin-top: 50%;
        }
        .shrink{
          width: 80px;
          height: 35px;
          border-radius: 5px;
          color: #FFFFFF;
          text-align: center;
          line-height: 35px;
          background-color: orangered;
          position: fixed;
          bottom: 51px;
          left: 50%;
          transform: translateX(-50%);
        }
       /*最外层容器样式*/
              .wrap {
                  width: 200px;
                  height: 200px;
                  margin: 0 auto;
                  position: relative;
              }

              /*包裹所有容器样式*/
              .cube {
                  width: 200px;
                  height: 200px;
                  margin: 0 auto;
                  transform-style: preserve-3d;
                  transform: rotateX(0deg) rotateY(0deg);
                  animation: rotate linear 21s infinite;
              }

              @-webkit-keyframes rotate {
                  from {
                      transform: rotateX(0deg) rotateY(0deg);
                  }
                  to {
                      transform: rotateX(360deg) rotateY(360deg);
                  }
              }

              .cube div {
                  position: absolute;
                  width: 200px;
                  height: 200px;
                  transition: all .4s;
              }

              /*定义所有图片样式*/
              .pic {
                  width: 200px;
                  height: 200px;
              }

              .cube .out_front {
                  transform: rotateY(0deg) translateZ(100px);
              }

              .cube .out_back {
                  transform: translateZ(-100px) rotateY(180deg);
              }

              .cube .out_left {
                  transform: rotateY(-90deg) translateZ(100px);
              }

              .cube .out_right {
                  transform: rotateY(90deg) translateZ(100px);
              }

              .cube .out_top {
                  transform: rotateX(90deg) translateZ(100px);
              }

              .cube .out_bottom {
                  transform: rotateX(-90deg) translateZ(100px);
              }

              /*定义小正方体样式*/
              .cube span {
                  display: block;
                  width: 100px;
                  height: 100px;
                  position: absolute;
                  top: 50px;
                  left: 50px;
              }

              .cube .in_pic {
                  width: 100px;
                  height: 100px;
              }

              .cube .in_front {
                  transform: rotateY(0deg) translateZ(50px);
              }

              .cube .in_back {
                  transform: translateZ(-50px) rotateY(180deg);
              }

              .cube .in_left {
                  transform: rotateY(-90deg) translateZ(50px);
              }

              .cube .in_right {
                  transform: rotateY(90deg) translateZ(50px);
              }

              .cube .in_top {
                  transform: rotateX(90deg) translateZ(50px);
              }

              .cube .in_bottom {
                  transform: rotateX(-90deg) translateZ(50px);
              }

              /*鼠标移入后样式*/
              .cube:hover .out_front {
                  transform: rotateY(0deg) translateZ(200px);
              }

              .cube:hover .out_back {
                  transform: translateZ(-200px) rotateY(180deg);
              }

              .cube:hover .out_left {
                  transform: rotateY(-90deg) translateZ(200px);
              }

              .cube:hover .out_right {
                  transform: rotateY(90deg) translateZ(200px);
              }

              .cube:hover .out_top {
                  transform: rotateX(90deg) translateZ(200px);
              }

              .cube:hover .out_bottom {
                  transform: rotateX(-90deg) translateZ(200px);
              }
</style>
