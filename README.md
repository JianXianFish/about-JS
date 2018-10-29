* #### [JS相关](#js相关-1)
  1. [获取URL参数值](#1获取url参数值)
  2. [头部提取之后，导航跳转添加对应的active ](#2头部提取之后导航跳转添加对应的active)
  3. [swiper常用参数](#3swiper常用参数)
  4. [锚链接平滑移动](#4锚链接平滑移动)
  5. [数字递增](#5数字递增)
  6. [侧边栏吸边](#6侧边栏吸边)
  7. [AJAX请求](#7ajax请求)
  8. [缓存相关操作](#8缓存相关操作)
  9. [页面向下滚动头部加阴影](#9页面向下滚动头部加阴影)
  
  
  ## JS相关
### 1、获取URL参数值
获取URL的参数的值。
```
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
```

### 2、头部提取之后，导航跳转添加对应的active
添加到提取的header.html中
```
$(".navbar-nav a").each(function(){
  $this = $(this);
  if($this[0].href==String(window.location)){
    $(".navbar-nav li").removeClass("active");
    $this.parent("li").addClass("active");
  }
});
```

### 3、swiper常用参数
```
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>

var Swiper1 = new Swiper('.swiper-container', {
    autoplay: {		                //自动播放
        delay: 1000,	            //间隔时间
        disableOnInteraction: false,	//用户操作swiper之后，是否禁止autoplay。
    },
    slidesPerView: 4,	            //一屏显示多少个
    slidesPerColumn: 2,	          //显示2行
    spaceBetween: 30,	            //每个之间的间距
    noSwiping : true,	            //使该slide无法拖动，希望文字被选中时可以考虑使用
    noSwipingClass : 'no-swiper',
    centeredSlides : true,	      //居中显示
    loop: true,		                //头尾循环
    observer: true,		            //修改swiper自己或子元素时，自动初始化swiper 
    observeParents: true,	        //修改swiper的父元素时，自动初始化swiper 
    pagination: {		              //分页器
        el: '.swiper-pagination',
        clickable :true         	//允许点击分页器切换
    },
    navigation: {		              //前进后退按钮
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {		            //响应式设置
        1200: {
          slidesPerView: 4,
          spaceBetween: 35
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 35
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 35
        },
        400: {
          slidesPerView: 1,
          spaceBetween: 35
        }
    }
})
```

### 4、锚链接平滑移动
```
$('.navbar-nav a[href*=#]').click(function() {  
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {  
        var $target = $(this.hash);  
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');  
        if ($target.length) {  
            var targetOffset = $target.offset().top;  
            $('html,body').animate({  
                scrollTop: targetOffset  
            },700);  
            return false;  
        }  
    }  
});
```

### 5、数字递增
```
<div id="id">
    <p class="incrementing" data-to="20" data-speed="1500">10</p>
</div>

//数字递增
var wrapTop = $("#id").offset().top;
var istrue = true;
$(window).on("scroll",
function() {
    var s = $(window).scrollTop();
    if (s > wrapTop - 600 && istrue) {
        $(".incrementing").each(count);
        function count(a) {
            var b = $(this);
            a = $.extend({},
            a || {},
            b.data("countToOptions") || {});
            b.countTo(a)
        };
        istrue = false;
    };
})
//设置计数
$.fn.countTo = function (options) {
  options = options || {};
  return $(this).each(function () {
  //当前元素的选项
  var settings = $.extend({}, $.fn.countTo.defaults, {
    from:            $(this).data('from'),
    to:              $(this).data('to'),
    speed:           $(this).data('speed'),
    refreshInterval: $(this).data('refresh-interval'),
    decimals:        $(this).data('decimals')
  }, options);
  //更新值
  var loops = Math.ceil(settings.speed / settings.refreshInterval),
      increment = (settings.to - settings.from) / loops;
  //更改应用和变量
  var self = this,
  $self = $(this),
  loopCount = 0,
  value = settings.from,
  data = $self.data('countTo') || {};
  $self.data('countTo', data);
  //如果有间断，找到并清除
  if (data.interval) {
    clearInterval(data.interval);
  };
  data.interval = setInterval(updateTimer, settings.refreshInterval);
  //初始化起始值
  render(value);
  function updateTimer() {
    value += increment;
    loopCount++;
    render(value);
    if (typeof(settings.onUpdate) == 'function') {
      settings.onUpdate.call(self, value);
    }
    if (loopCount >= loops) {
      //移出间隔
      $self.removeData('countTo');
      clearInterval(data.interval);
      value = settings.to;
      if (typeof(settings.onComplete) == 'function') {
        settings.onComplete.call(self, value);
      }
    }
  }
  function render(value) {
    var formattedValue = settings.formatter.call(self, value, settings);
    $self.html(formattedValue);
  }
  });
};
$.fn.countTo.defaults={
  from:0,               //数字开始的值
  to:0,                 //数字结束的值
  speed:1000,           //设置步长的时间
  refreshInterval:100,  //隔间值
  decimals:0,           //显示小位数
  formatter: formatter, //渲染之前格式化
  onUpdate:null,        //每次更新前的回调方法
  onComplete:null       //完成更新的回调方法
};
function formatter(value, settings){
  return value.toFixed(settings.decimals);
}
//自定义格式
$('.incrementing').data('countToOptions',{
  formmatter:function(value, options){
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
});
//定时器
$('.incrementing').each(count);
function count(options){
  var $this=$(this);
  options=$.extend({}, options||{}, $this.data('countToOptions')||{});
  $this.countTo(options);
}
```

### 6、侧边栏吸边
侧边栏吸内容的边： 下面例子 #backtop 是侧边栏

原理：（窗口宽度 - 内容块的宽度）/ 2 再减去 #backtop的宽度 就是 #backtop的right值

![侧边栏吸边](https://raw.githubusercontent.com/ZHAO-Shaofeng/Related-considerations-for-HTML-CSS-JS/master/github-img/sidebar.jpg)

```
<style>
#backtop{
  position: fixed;
  width: 110px;
  bottom: 0;
  opacity: 0;
  z-index: 100;
  transition: 0.3s;
}
#backtop.show{opacity: 1;}
</style>

window.onload = function() {
  var _width = ($(window).width() - $(".container").width())/2;
      _width -= $("#backtop").width();
      _width -= 8   //与内容块之间的距离
      $("#backtop").css("right", _width);
      $("#backtop").addClass("show");
}
$(window).resize(function(){
    var _width = ($(window).width() - $(".container").width())/2;
    _width -= $("#backtop").width();
    _width -= 8
    $("#backtop").css("right", _width);
});
```

### 7、AJAX请求
```
var json ={
  mid: '123',
  version_timestamp: '456'
}
$.ajax({
  url: '',
  type: 'post',
  dataType: 'json',
  data: json,
  beforeSend: function(){
    $("body").append(bodymask);
  },
  success: function(res){
    $(".bodymask").remove();
    for(var i=0;i<res.Data.length;i++){
      $('select[name="GetHotelList"]').append(
        $('<option value="'+ res.Data[i].Id +'">'+res.Data[i].Name+'</option>')
      )
    }
  }
})
```

### 8、缓存相关操作
```
if(window.localStorage){
  //存储名字为name值为caibin的变量
  localStorage.setItem("name","caibin");

  //读取保存在localStorage对象里名为name的变量的值
  localStorage.getItem("name");

  // 检查localStorage里是否保存某个变量
  localStorage.hasOwnProperty('name'); // true false

  // 清空localStorage
  localStorage.clear();
｝
```
#### 对象类型转为包含JSON文本的字符串类型
```
SignPointList_Data = JSON.stringify(res.Data);
```
#### 转为JSON
```
SignPointList_Data = JSON.parse(SignPointList_Data);
```

### 9、页面向下滚动头部加阴影
```
.shadow {
  box-shadow: 0 0 5px 0 #aaa;
}


$(window).scroll(function(){
  if ($(document).scrollTop() > 0) {
    $('.header').addClass("shadow");
  } else {
    $('.header').removeClass("shadow");
  }
});
```
