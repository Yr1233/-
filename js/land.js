const landdom = $('.land');
const landStyle = getComputedStyle(landdom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);

class Land extends Rectangle {
    constructor(speed) {
        super(landWidth, landHeight, 0, landTop, speed, 0, landdom);
    };
    onMove() {
        if (this.left <= -landWidth / 2) {
            this.left = 0;
        };
    };
};