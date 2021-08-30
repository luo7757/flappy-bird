const skyDom = $('.sky')[0];
const skyWidth = skyDom.getBoundingClientRect().width;
const skyHeight = skyDom.getBoundingClientRect().height;
// console.log(sky.getBoundingClientRect())

class Sky extends Rectangle{
    constructor(speed){
        super(skyHeight, skyWidth, 0, 0, speed, 0, skyDom);
    }
    onMove(){
       if(Math.abs(this.domLeft) > this.width / 2) this.domLeft = 0;
    }
}
// var sky  = new Sky(-100);

// function skyMove(){
//     sky.move(0.003);
//     requestAnimationFrame(skyMove);
// }
// skyMove();