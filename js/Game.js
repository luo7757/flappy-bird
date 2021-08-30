// Game类 调用之前的类 每个功能单独测试好了之后 统一调用 
const Game = (() => {
    const isHit = Symbol();
    const isGameOver = Symbol();
    const wrapper = $('.wrapper')[0];
    return class{
        constructor(){
            this.sky = new Sky(-100);
            this.land = new Land(-100);
            this.bird = new Bird(-100);
            this.produce = new PipePareProducer(-100);
            this.index = wrapper;
            this.timer = null;//保存动画
            this.tick = 16;//
            this.gameOver = false;//当游戏失败后，点击就重新刷新游戏
        }
    
        start(){
            if(this.timer) return;
            if(this.gameOver) window.location.reload();
            this.bird.startSwing();
            this.produce.startProduce();
            this.index.className = 'wrapper';
            this.animationStart();
            // this.timer = setInterval(() => {
            //     this.sky.move(0.008);
            //     this.land.move(0.018);
            //     this.bird.move(0.028);
            //     this.produce.pipeList.forEach(ele => {
            //         ele.move(0.018);
            //     })
            //     if (this[isGameOver]()) {
            //         this.stop();
            //         this.gameOver = true;
            //     }
            // }, this.tick);
        }
        animationStart(){
            // console.log(this.sky)
            this.sky.move(0.003);
            this.land.move(0.006);
            this.bird.move(0.011);
            this.produce.pipeList.forEach(ele => {
                ele.move(0.006);
            })
            // console.log(this[isGameOver]());
            
            // if(this[isGameOver]()){
            //     return;
            // }
            this.timer = requestAnimationFrame(this.animationStart.bind(this));
            this.judge();
        }
        judge(){
            if(this[isGameOver]()){
                this.stop();
                this.gameOver = true;
            }
        }
        stop(){
            // console.log(cancelAnimationFrame(this.timer));
            cancelAnimationFrame(this.timer);
            // clearInterval(this.timer);
            this.timer = null;
            this.bird.stopSwing();
            this.produce.stopProduce();
            this.index.className = ' wrapper index';

        }
        [isHit](box1,box2){//计算两个方块之间的距离 大于或这小于 返回true 或false
            let centerX1 = box1.domLeft + box1.width / 2;
            let centerY1 = box1.domTop + box1.height / 2;
            let centerX2 = box2.domLeft + box2.width / 2;
            let centerY2 = box2.domTop + box2.height / 2;
            // console.log(box2.domLeft,box2.width,box2.domTop,box2.height);
            let disX = Math.abs(centerX1 - centerX2);
            let disY = Math.abs(centerY1 - centerY2);
            // console.log((box1.height + box2.height) / 2,disY);
            if(disX < (box1.width + box2.width) / 2 && disY < (box1.height + box2.height) / 2){
                return true;
            }
            return false;
            
        }
        [isGameOver](){//游戏失败的条件
            // 当鸟的top值等于 landTop(大地居上顶部的top值) 失败
            if(this.bird.domTop === this.bird.maxTop) return true;

            for (let i = 0; i < this.produce.pipeList.length; i++) {
                let pipe = this.produce.pipeList[i];
                if(this[isHit](this.bird, pipe.upPipe) || this[isHit](this.bird, pipe.downPipe)){
                    return true;
                }
            }
            return false;
        }
    
        bindEvent(){
            window.onkeydown = e => {
                if(e.key === "Enter"){
                    if(this.timer){
                        this.stop();
                    }else{
                        this.start();
                    }
                }else if(e.key === " "){
                    this.bird.jump();
                }
            }
        }
    }
})()
const g = new Game();
g.bindEvent();