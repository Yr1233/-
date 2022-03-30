function $(select) {
    return document.querySelector(select);
}
/**
 * 父类矩形
 * 参数: 宽、高、横坐标、纵坐标、横向速度、纵向速度、要移动dom元素
 * @param {*} width 元素的宽度
 * @param {*} height 元素的高度
 * @param {*} left 元素的left值
 * @param {*} top 元素的top值
 * @param {*} xSpeed 横向速度速度 单位:像素/秒
 * @param {*} ySpeed 纵向速度 单位:像素/秒
 * @param {*} dom 要移动的dom元素
 */
class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    };

    //渲染页面
    render() {
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    };

    /**
     * 移动功能
     * @param {*} distance 速度 单位:秒
     */
    move(distance) {
        const xDis = this.xSpeed * distance;
        const yDis = this.ySpeed * distance;
        const newLeft = this.left + xDis;
        const newTop = this.top + yDis;
        this.left = newLeft;
        this.top = newTop;
        if (this.onMove) {
            this.onMove();
        }

        this.render();
    };
}