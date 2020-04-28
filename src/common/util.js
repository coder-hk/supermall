export function debounce(func,delay=300){
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(function(){
      func(...args)
    },delay)
  }
}
export const imgLoadMixIn = {
  data(){
    return{
      itemImgListener:()=>{},
    }
  },
  mounted(){
    let refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener = ()=>{refresh()}//防抖
    this.$bus.$on('imgOneLoad',this.itemImgListener)
  }
}
export const backTopMixIn={
  data(){
    return{
      show:false,
      backToFunc :(index)=>{

        let posY = index !== undefined?this.distanceList[index]:0
        let userChoice = false
        if(posY == 0 || posY  ){
          this.$refs.scroll.backTo(0,posY,150)
          return 0
        }else{
          if(posY == null) {
            userChoice = confirm("图片未加载完成，按确认重新跳转")
            console.log(userChoice,posY);
            if(userChoice){
              setTimeout(()=>{
                posY = this.distanceList[index]
                if (posY) {
                this.$refs.scroll.backTo(0,posY,150)
                }
              },1000)
            }
          }
        }
      }
    }
  },
}
export const tabControlMixIn = {
  data(){
    return {
      currentType:'pop'
    }
  },
  methods:{
    changeTabItem(index){
      this.currentType = Object.values(this.goods)[index]
    },
  }
}
//事件处理类,msec时间戳毫秒值
export function formatDate(msec,fmt){
  //fmt instance : 'yyyy-MM-dd hh:mm:ss'
  let date = new Date(msec * 1000)
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,date.getFullYear()+''.substr(0,RegExp.$1.length))
  }
  const o={
    //floor向小/下取整
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+4)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  }
  for (let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let res = RegExp.$1,oValStr=o[k]+''
      fmt=fmt.replace(res,function(){
        if(res.length == oValStr.length || k == 'S')
          return oValStr
        else{
          let originalLen = oValStr.length

          oValStr = "00"+oValStr
          return oValStr.substr(originalLen)
        }
      })
    }
  }
  return fmt
}

export function remove(arr,index){
　　if(isNaN(index)||index>arr.length) {return false}
　　for(let i=0,n=0;i<arr.length;i++)
　　{
　　　　if(arr[i].iid!=arr[index].iid)
　　　　{
　　　　　　arr[n++]=arr[i]
　　　　}
　　}
    arr.length-=1
    return arr
}
