//发布订阅模式     一旦天气发生变化的时候，就通知所有订阅天气服务器的人做对应的变化

//1.订阅器  维护了所有订阅天气服务器的人
function Dept(){
    this.watchers = [];   //数组里面存放了所有要订阅天气服务器的人
    //添加观察者的方法
    this.addWatch = function(watch){
        this.watchers.push(watch)
    }
    //通知观察者更新的方法
    this.updateWatch = function(weatcher){
        this.watchers.forEach(watch=>{
            watch.update(weatcher)
        })
    }
}


//2.观察者
function Watcher(name){
    this.name = name;
    this.update = function(weatcher){
        console.log(this.name+"接收到新的天气"+weatcher+"做对应的事情")
    }
}
var xiaoming  = new Watcher("小明")
var xiaohong  = new Watcher("小红")
var xiaohei  = new Watcher("小黑")

var dept = new Dept();
dept.addWatch(xiaoming)
dept.addWatch(xiaohong)
dept.addWatch(xiaohei)



//天气预报站
var weatherStation = {}
//Object.defineProperty 数据劫持的 (劫持数据的变化)
Object.defineProperty(weatherStation, 'weather', {
    //只要在外部给weatherStation设置新的weather的时候就会执行该set方法  (就相当于set方法劫持了数据的变化)
    set: function (value) {
        weather = value;
        // console.log('新的天气是' + value);
        dept.updateWatch(value)
    },
    //只要在外部获取weatherStation的weather的值的时候就会执行get方法
    get: function () {
        return '《' + weather + '》'
    }
})

weatherStation.weather = '晴天';  
weatherStation.weather = '下雨';  
// console.log(weatherStation.weather);  