class Game {
    constructor() {
        this.bird = new Bird();
        this.land = new Land(-100);
        this.sky = new Sky();
        //柱子生成器
        this.Conduit = new conduit();
        this.PipePro = new pipeProduce(-100);
        this.timer = null;
        this.tick = 16;
        this.gameOver = false;
    };

    //检测两个矩形(小鸟和水管两个矩形)是否发生碰撞
    /**
     * @param {*} res1 第一个矩形
     * @param {*} res2 第二个矩形
     * 横向: 两个矩形的中心点的横向距离，是否小于两个矩形的宽度之和的一半;
     * 纵向: 两个矩形的中心点的纵向距离，是否小于两个矩形的高度之和的一半;
     */
    isHit(res1, res2) {
        const centerX1 = res1.left + res1.width / 2;
        const centerY1 = res1.top + res1.height / 2;
        const centerX2 = res2.left + res2.width / 2;
        const centerY2 = res2.top + res2.height / 2;
        const disX = Math.abs(centerX1 - centerX2); //横向的中心点的距离
        const disY = Math.abs(centerY1 - centerY2); //纵向的中心点的距离
        if (disX < ((res1.width + res2.width) / 2) && disY < ((res1.height + res2.height) / 2)) {
            return true;
        }
        return false;
    };

    //游戏结束
    isGameOver() {
        //判断小鸟是否落地
        if (this.bird.top === birdMaxTop) {
            return true;
        };

        //判断鸟和水管是否发生了体积碰撞
        for (let i = 0; i < this.PipePro.pipeArr.length; i++) {
            const pair = this.PipePro.pipeArr[i];
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;;
            };
        };
        return false;
    };

    //游戏开始
    gameStart() {
        if (this.timer) {
            return;
        };
        this.isGameOver();
        this.PipePro.startAddPipe(); //生产水管对
        const newTime = this.tick / 1000; //间隔时间
        //定时器 控制天空 水管等定时运动
        this.timer = setInterval(() => {
            this.isGameOver();
            this.bird.move(0.1);
            this.land.move(newTime);
            this.sky.move(newTime);
            this.PipePro.pipeArr.forEach(item => {
                item.move(16 / 1000);
            });
            this.bird.birdWingMove();
            //游戏结束
            if (this.isGameOver()) {
                this.gameStop();
                this.gameOver = true;
                //判断游戏是否结束
                confirm("游戏结束!") ? confirm('是否重新开始游戏?') ? location.reload() : '' : '';

            }
        }, this.tick);

    };


    //游戏暂停
    gameStop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopBirdWingMove();
        this.PipePro.stopAddPipe();
    };

    //键盘操控
    //检测键盘状态
    regEvent() {
        window.onkeydown = (e) => {
            //判断键盘点击事件
            if (e.key === 'Enter') {
                if (this.timer) {
                    this.gameStop();
                } else {
                    this.gameStart();
                }
            };
            if (e.key === ' ') {
                this.bird.moveUp();
            };

        }
    };
}
var game = new Game();
game.regEvent();