<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="defaultHidden">
      <div class="placeholder">
      </div>
      <tab-control :titles="['综合', '新品', '销量']"
                     @tabClick="changeTabItem" v-show="reachTop" class="fixedTabControl" ref="tabControl"></tab-control>
                   </div >
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content" :data="[categoryData]" ref="scroll" :probeType="3" @distanceY="judgeHeight">
        <div>
          <tab-content-category :subcategories="showSubcategory" @finishLoad="updatePageHeight"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="changeTabItem" ref="tabControl1" ></tab-control>
          <tab-content-detail :categoryDetail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
    <back-top @click.native='backToFunc()' v-show="reachTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabControl from 'components/content/TabControl'
  import Scroll from 'components/common/scroll/Scroll'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {backTopMixIn,debounce} from "common/util";
  import BackTop from 'components/common/backtop/BackTop'
  export default {
		name: "Category",
    components: {
		  NavBar,
      TabMenu,
      TabControl,
      Scroll,
      TabContentCategory,
      TabContentDetail,
      BackTop
    },
    data() {
		  return {
		    categories: [],
        categoryData: {
        },
        currentIndex: -1,
        goods:['pop','new','sell'],
        refreshFunc : function(){},
        tabControlTop:0,
        reachTop:false,
        currentType:'pop',
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    activated(){
      let oldFunc = ()=>{
        this.$refs.scroll.refresh();this.tabControlTop = this.$refs.tabControl1.$el.offsetTop
      }
      this.refreshFunc = debounce(oldFunc,200)
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    mixins:[backTopMixIn],
    methods: {
      updatePageHeight(){
        this.refreshFunc()
      },
      judgeHeight(position){
        if(-position.y >= this.tabControlTop)
        this.reachTop = true
        else
        this.reachTop = false
      },
      changeTabItem(index){
        this.currentType = Object.values(this.goods)[index]
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
        this.$refs.tabControl1.currentIndex = 0
        this.$refs.tabControl.currentIndex = 0
      }
    }
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .defaultHidden{
    display: flex;
  }
  .placeholder{
    width: 100px;
  }
  .fixedTabControl{
    z-index: 9;
    flex: 1;
    position: relative;
    top: 0px;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 45px;
    bottom: 49px;
    display: flex;
    overflow: hidden;
  }
  #tab-content {
    height: 100% ;
    flex: 1;
  }
</style>
