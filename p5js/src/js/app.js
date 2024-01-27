// https://github.com/processing/p5.js/wiki/Global-and-instance-mode
import p5 from "p5";

/**
 * @param {p5} s
 */
const sketch = function (s) {
    s.setup = function () {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = function () {
        s.background(255);
        s.fill(0);
        s.ellipse(s.windowWidth / 2, s.windowHeight / 2, 50, 50);
    };
};

const sketchInstance = new p5(sketch, document.getElementById("sketch"));
