const landDom = $('.land')[0];
const landWidth = landDom.getBoundingClientRect().width;
const landHeight = landDom.getBoundingClientRect().height;

const landTop = skyHeight - landHeight;//除开大地后的天空高度
// console.log(landTop)

class Land extends Rectangle{
    constructor(speed){
        super(landHeight, landWidth, landTop, 0, speed, 0, landDom);
    }
    onMove(){
        if(Math.abs(this.domLeft) > landWidth / 2) this.domLeft = 0;
    }
}
// var land = new Land(-100);
// // console.log(land)
// function landMove(){
//     land.move(0.006);
//     sky.move(0.003);
//     requestAnimationFrame(landMove);
// }
// landMove();
// console.log(skyHeight);