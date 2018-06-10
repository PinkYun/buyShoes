var letao;
$(function () {
    // 声明letao new一个乐淘对象
    letao = new Letao();
    // 通过乐淘来调用里面的方法
   letao.downRefresh();
})
// 创建一个乐淘的构造函数
var Letao = function () {};
// 通过原型 是对象
Letao.prototype = {
    // 实现下拉刷新
    downRefresh:function(){
        mui.init({
            pullRefresh : {
              container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                    // 设置了一个定时器 让它在1.5秒后执行刷新完毕
                    setTimeout(function(){
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
                    },1500);
                } 
              },
              container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              up : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "上拉加载",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即加载",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "在下给不了你更多了..",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){
                    // 设置了一个定时器 让它在1.5秒后执行刷新完毕
                    setTimeout(function(){
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh()
                    },1500);
                } 
              }
            }
          });

    }
}
