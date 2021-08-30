
// 初始在屏幕外  生成元素时上下一起 每组元素的中间距离固定
// 元素间隔 300 ms 生成一对
// 元素的 left 变  化固定
const gameDom = $('.game')[0];
const gameWidth = gameDom.getBoundingClientRect().width;
const gameHeight = gameDom.getBoundingClientRect().height;
// 
class Pipe extends Rectangle{
    constructor(height, top, speed, dom){
        super(height, 52, top, gameWidth, speed, 0, dom);
        super.render();
    }
    onMove(){//这个方法会在 move函数调用时 调用 move函数用于改变letf
        if(this.domLeft < -this.width){
            this.dom.remove();
        }
    }
}
function getRandom(min, max){
    return ~~(Math.random() * (max - min) + min);
}

// 上下柱子的位置计算 
// 随机一个 下柱子的高度 那么上柱子的高度就是 sky - land - downPipe
// 柱子的left值 默认开始的时候就是sky的width 值，每个柱子产生后left就开始变化
// 当left值 小于 0 - pipeWidth的时候就删除（这个方法需要变成实例成员的属性）
class PipePare{
    constructor(speed){
        this.spaceHeight = 150;//空隙位置的高度
        this.minHeight = 80;// 柱子的最小高度 柱子最小不小于80高
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;
        // 减去空隙、和最小宽度 得出一个柱子的范围 由于减去了最小height 80 和 间隔
        // 保证了不会出现 高度不够的问题

        const upDom = document.createElement('div');
        const upHeight = getRandom(this.minHeight, this.maxHeight);
        // 最小值 80 最大值 maxHeight 之间的随机值
        upDom.className = 'pipe up';
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);//上水管

        const downDom = document.createElement('div');
        // 下柱子的高度 等于 landTop - 上柱子 - 间隔
        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;//定位的话，就是 上柱子减去间隔
        downDom.className = 'pipe down';
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);
        // speed 由外部传入

        gameDom.appendChild(upDom)
        gameDom.appendChild(downDom)
    }

    get useLess(){
        // console.log(this.upPipe.domLeft,-this.upPipe.width)
        return this.upPipe.domLeft < -this.upPipe.width;
        // letf 默认是game对象的width(正几百)值，当left为负值，小于柱子的宽度 就是移出了game区域
    }

    // move(duration){
    //     this.upPipe.move(duration);
    //     this.downPipe.move(duration);
    // }
    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}


// 不断产生柱子对
class PipePareProducer{
    constructor(speed){
        this.speed = speed;
        this.pipeList = [];
        this.timer = null;
        this.tick = 1500;
    }

    startProduce(){
        if(this.timer) return;
        this.timer = setInterval(() => {
            this.pipeList.push(new PipePare(this.speed));
            //这个arr 里面的柱子是通过 pipe位置信息 构造器 再通过pipe构造器 继承自方块构造器
            // 里面保存了 每对实例化的柱子
            for (let i = 0; i < this.pipeList.length; i++) {
                var pipe = this.pipeList[i];
                // console.log(pipe.useLess);
                if(pipe.useLess){
                    this.pipeList.splice(i, 1);
                    i--;
                }
            }
            // console.log(this.pipeList);
            // this.pipeList.forEach((ele,index) => {
            //     console.log(this.pipeList);
            //     if(ele.useLess){
            //         console.log(this.pipeList);
            //         this.pipeList.splice(index, 1);
            //     }
            // })
        }, this.tick);
    }
    stopProduce(){
        clearInterval(this.timer);
        this.timer = null;
    }
}

// var produce = new PipePareProducer(-100);
// produce.startProduce();

// function proMove(){
//     produce.pipeList.forEach(ele => {
//         ele.move(0.006);
//     })
//     requestAnimationFrame(proMove);
// }
// proMove();
