function   getId(id) {
	return document.getElementById(id);
}

function   getTagName(tagName) {
	return document.getElementsByTagName(tagName);
}



function  setInnerText(element,text){
	if(typeof  element.textContent=="undefined"){
		element.innerText=text;
	}else{
		element.textContent = text;
	}
}


//封装一个函数-任意点击一个按钮就可以移动div，需要传入两个参数：元素，目标
			function animate1(element, target){
				//为了下一次使用动画，我们先清理定时器
				clearInterval(element.timeId);//清理的是绑定在当前元素上的定时器
				//为元素绑定选择器
				element.timeId = setInterval(function(){
					//获取到div的位置
					var current = element.offsetLeft;
					//div走位
					var step = 10;
					//如果需要回到400px的位置，那么坐标应该是负数
					step = current<target ? step : -step;
					//每次移动的距离
					current += step;
					//判断当前移动后的位置是否到达目标位置
					//为了避免出现负数，我们使用绝对值
					if(Math.abs(target-current) > Math.abs(step)){
						//进行赋值计算
						element.style.left = current + "px";
					}else{
						//达到目标后清理定时器
						clearInterval(element.timeId);
						//给最终的目标赋值
						element.style.left = target + "px";
					}
				},20);
			}


/*点击按钮，改变任意的一个目标值*/
			/*封装一个函数 - 用于获取到任意一个元素的一个当前的值 - 当前属性的位置值  */
			/* window.getComputedStyle表示获取当前元素的style中的值
			 * window.getComputedStyle(element,null)[attr]表示如果获取到了就直接绑定
			 * element.currentStyle[attr]||0表示如果获取不到，则会当前已经有的属性或者是0--什么都没有
			 */
   function   getStyle(element,atter){
	       return window.getComputedStyle?window.getComputedStyle(element,null)[atter]:
	       element.currentStyle[atter]||0;
          }


			/* 两个参数：
			 * 第一个参数：需要处理的元素
			 * 第二个参数：处理的要求：这里使用json字符串来处理，一次性写多个要求
			 */
			function animate2(element, json){
				//先清理定时器
				clearInterval(element.timeId);
				//设置一个定时器
				element.timeId = setInterval(function(){
					//因为当前需要写多个要求，所这里我们设置一个flag要求全部达标
					var flag = true;//全部达标
					//遍历json - json没有下标所以使用for-in循环
					for(var attr in json){
						//获取元素属性的当前值
						var current = parseInt(getStyle(element, attr));
						//当前的值所对应的目标值
						var target = json[attr];
						//移动的步数处理
						var step = (target-current)/10;
						//因为上面有一个除法会出现小数，所以我们这里使用向上和向下取整
						step = step>0?Math.ceil(step):Math.floor(step);
						current += step;
						//赋值操作
						element.style[attr] = current + "px";
						//判断是否达标-不达标就继续循环
						if(current != target){//没有达标
							flag = false;
						}
					}
					//如果达标了
					if(flag){//true
						//清理定时器
						clearInterval(element.timeId);
					}
					//测试代码
					console.log("目标："+target+"，当前"+current+"，每次移动步数："+step);
				}, 20);
			}


function animate3(element, json,fn){
				//先清理定时器
				clearInterval(element.timeId);
				//设置一个定时器
				element.timeId = setInterval(function(){
					//因为当前需要写多个要求，所这里我们设置一个flag要求全部达标
					var flag = true;//全部达标
					//遍历json - json没有下标所以使用for-in循环
					for(var attr in json){
						//获取当前元素属性的位置值
						var current = parseInt(getStyle(element, attr));
						//当前的值所对应的目标值
						var target = json[attr];
						//移动的步数处理
						var step = (target-current)/10;
						//因为上面有一个除法会出现小数，所以我们这里使用向上和向下取整
						step = step>0?Math.ceil(step):Math.floor(step);
						current += step;
						//赋值操作
						element.style[attr] = current + "px";
						//判断是否达标-不达标就继续循环
						if(current != target){//没有达标
							flag = false;
						}
					}
					//如果达标了
					if(flag){
						clearInterval(element.timeId);
						if( fn ) {  fn();  }
					}
					//测试代码
					console.log("目标："+target+"，当前"+current+"，每次移动步数："+step);
				}, 20);
			}



//得到滚动出去的位置
function getScroll(){
    var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    var scrollLeft = document.body.scrollLeft||document.documentElement.scrollLeft;
    return {
        scrollTop:scrollTop,
        scrollLeft:scrollLeft
    }
}


//得到鼠标在页面中的位置
function getPage(e){
    var oev = e||window.event;
    //pageX = 可视区的位置 + 左边滚动出去的位置
    var pageX = oev.clientX + getScroll().scrollLeft;
    var pageY = oev.clientY + getScroll().scrollTop;
    return {
        pageX:pageX,
        pageY:pageY
    }
}