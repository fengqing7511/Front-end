function   getId(id) {
	return document.getElementById(id);
}

function  setInnerText(element,text){
	if(typeof  element.textContent=="undefined"){
		element.innerText=text;
	}else{
		element.textContent = text;
	}
}

function   getStyle(element,atter){
	return window.getComputedStyle?window.getComputedStyle(element,null)[atter]:
	element.currentStyle[atter]||0;
}

			/* 两个参数：
			 * 第一个参数：需要处理的元素、
			 * 第二个参数：处理的要求：这里使用json字符串来处理，一次性写多个要求
			 */
			function animate(element, json){
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
