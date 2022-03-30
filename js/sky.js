const skydom = $('.sky');
const skyStyle = getComputedStyle(skydom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);
const skyLeft = skyStyle.left;

class Sky extends Rectangle {
    constructor() {
        super(skyWidth, skyHeight, 0, 0, -100, 0, skydom);
    }
    onMove() {
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
        // console.log(this.left, skyWidth)

    }
}