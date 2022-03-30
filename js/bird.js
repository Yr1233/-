const birddom = $('.bird');
const birdStyle = getComputedStyle(birddom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdLeft = parseFloat(birdStyle.left);
const birdTop = parseFloat(birdStyle.top);
const birdMaxTop = parseFloat($('.game').clientHeight - landHeight - birdHeight)

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birddom);
        this.g = 40; //重力加速度
        this.wingMoveState = 1;
        this.timer = null;
    }

    //重写小鸟移动功能Move
    move(distance) {
        super.move(distance);
        this.ySpeed += this.g * distance;

        if (this.top < 0) {
            this.top = 0;
        } else if (this.top >= birdMaxTop) {
            this.top = birdMaxTop;
        };

        this.render();
    };

    //小鸟飞行功能
    moveUp() {
        this.ySpeed = -45;
        this.render();
    }

    //开启小鸟翅膀煽动功能
    birdWingMove() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.wingMoveState = (this.wingMoveState + 1) % 3 + 1;
            birddom.className = `bird swing${this.wingMoveState}`;
        }, 200)
    };

    //关闭小鸟煽动翅膀
    stopBirdWingMove() {
        clearInterval(this.timer); //先请定时器
        this.timer = null; //再赋值为null
    }
}