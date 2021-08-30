/*
矩形创建 小鸟 柱子 天空 地面 都可以认为是一个移动的矩形
一个移动矩形的属性： 宽 高  x,y坐标  横/纵向速度  目标元素

通用的  移动的方法 根据元素身上的 speedX 来计算方向(正负值)和速度(数值) 

*/ 
class Rectangle{
    constructor(height,width,domTop,domLeft,speedX,speedY,dom){
        if(new.target === Rectangle){
            throw new TypeError('你不能通过公共父类创建实例');
        }
        this.height = height;
        this.width = width;
        this.domTop = domTop;
        this.domLeft = domLeft;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
    }
    // render方法创建一个盒子
    render(){
        $(this.dom).css({
            width : this.width,
            height : this.height,
            left : this.domLeft,
            top : this.domTop
        })
    }
    // 根据传入的数值来变化
    // duration 单位时间内的变化
    move(duration){
        const disX = this.speedX * duration;
        const disY = this.speedY * duration;
        // 计算单位时间的 速度值
        this.domLeft += disX;
        this.domTop  += disY;
        // 计算 更新后的值

        if(this.onMove){//子类有这个方法时会在move被调用后 通过if判断，父类来调用这个方法
            this.onMove();
        }
        this.render();
    }

}