const gameWidth = $('.game').clientWidth;
const gameHeight = $('.game').clientHeight - landHeight;

class pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    };
    onMove() {
        if (this.left <= -this.width) {
            this.dom.remove();
        }
    }
};
//随机获取min-max的水管高度数值
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

//管道类(水管对)
class conduit {
    constructor(speed) {
        const spacePipe = 150; //上下管道空隙间隔150
        this.minPipe = 80; //水管高度最小值
        this.maxPipe = gameHeight - this.minPipe - spacePipe; //水管高度最大值

        //创建容器
        const upPipeDom = document.createElement('div'); //创建上水管的div容器
        upPipeDom.className = 'pipe up'; //给上管道的容器添加一个class
        const downPipeDom = document.createElement('div'); //创建下水管的div容器
        downPipeDom.className = 'pipe down'; //给下管道的容器添加一个class

        //渲染上水管
        const upPipeHeight = getRandom(this.minPipe, this.maxPipe); //用随机值随机 上水管的的高度
        this.upPipe = new pipe(upPipeHeight, 0, speed, upPipeDom); //上水管

        //渲染下水管
        const downPipeHeight = gameHeight - spacePipe - upPipeHeight; //下水管的高度
        const downPipeTop = gameHeight - downPipeHeight; //距离下水管的高度top自值
        this.downPipe = new pipe(downPipeHeight, downPipeTop, speed, downPipeDom);

        $('.game').appendChild(upPipeDom);
        $('.game').appendChild(downPipeDom);
    };
    get useLess() {
        return this.upPipe.left <= -this.downPipe.width;
    };
    move(distance) {
        this.upPipe.move(distance);
        this.downPipe.move(distance);
    };
};

class pipeProduce {
    constructor(speed) {
        this.speed = speed;
        this.pipeArr = [];
        this.timer = null;
        this.tick = 1800;
    };

    //开始创建水管
    startAddPipe() {
        if (this.timer) {
            return;
        };
        this.timer = setInterval(() => {
            this.pipeArr.push(new conduit(this.speed));
            for (let i = 0; i < this.pipeArr.length; i++) {
                var spaceArr = this.pipeArr[i];
                if (spaceArr.useLess) {
                    this.pipeArr.splice(i, 1);
                    i--;
                }
            }
        }, this.tick);
    };

    //停止创建水管
    stopAddPipe() {
        clearInterval(this.timer);
        this.timer = null;
    }
};