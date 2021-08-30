const birdDom = $('.bird')[0];
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseInt(birdStyle.width);
const birdHeight = parseInt(birdStyle.height);
const birdTop = parseInt(birdStyle.top);
const birdLeft = parseInt(birdStyle.left);
console.log(getComputedStyle(birdDom).top);

class Bird extends Rectangle{
    constructor(speed){
        super(birdHeight, birdWidth, birdTop, birdLeft, 0, speed, birdDom);
        // this.duration = 0.01;
        this.g = 250;
        this.birdSwing = 1;
        this.timer= null;
        // 小鸟下落的最大top值，就是 天空高度 - 大地高度 - 小鸟高度
        this.maxTop = skyHeight - landHeight - birdHeight;
    }
    startSwing(){
        this.timer = setInterval(() => {
            this.birdSwing = ++this.birdSwing % 3 + 1;
            this.dom.className = `bird swing${this.birdSwing}`;
        }, 200);
    } 
    stopSwing(){
        clearInterval(this.timer);
    }
    
    move(duration){
        super.move(duration);
        this.speedY += this.g * duration; 
    }
    onMove(){
        if(this.domTop <= 0){
            this.domTop = 0;
        }else if(this.domTop > this.maxTop){
            this.domTop = this.maxTop; 
            this.stopSwing();
        }
    }
    jump(){
        this.speedY = -150;
    }
}


// $(document).on('keydown',function(e){
//     if(e.keyCode === 32){
//         bird.jump();
//     }
// })

// var bird = new Bird(-100);
// bird.startSwing();

// function birdMove(){
//     bird.move(0.011);
//     requestAnimationFrame(birdMove);
// }
// birdMove();

