import Canvas, { DrawStyle } from './canvas';

export default class MayanConverter {
  constructor(container) {
    const that = this;
    const input = container.querySelector('.input-control');
    const output = container.querySelector('.output-control');
    this.canvasHelper = new Canvas(output);

    input.addEventListener('input', () => {
      that._drawMayanNumber(input.valueAsNumber || Number(input.value));
    });
  }

  _drawMayanNumber(value) {
    const that = this;
    this.canvasHelper.clear();
    const blocks = [];
    const blockSize = 60;
    let val = value;
    let b = Math.floor(val / 20);
    while (b) {
      blocks.push(val - b * 20);
      val = b;
      b = Math.floor(val / 20);
    }
    blocks.push(val);

    this.canvasHelper.height = (blocks.length) * blockSize;

    blocks.reverse().forEach((block, i) => {
      that._drawBlock(i * blockSize, block);
    });
  }

  _drawBlock(position, value) {
    const that = this;
    const padding = 10;
    const x = padding;
    let y = position + padding;
    let fives;
    let fours;
    if (value === 0) {
      that._drawBall(x, y);
    } else if (value > 5) {
      fives = Math.floor(value / 5);
      fours = value - fives * 5;
    } else {
      fives = 0;
      fours = value;
    }
    that._drawBlockLine(fours, x, y);
    for (let i = 1; i <= fives; i += 1) {
      that._drawBlockLine(5, x, y += 10);
    }
  }

  _drawBlockLine(value, x, y) {
    const that = this;
    if (value < 5) {
      that._drawDots(value, x, y);
    } else if (value === 5) {
      that._drawLine(x, y);
    }
  }

  _drawDots(value, x, y) {
    x += (50 / 2) - (value * 12.5 / 2);
    let xx;
    for (let i = 0; i < value; i += 1) {
      xx = x + i * 12.5;
      this.canvasHelper.circle(xx, y);
    }
  }

  _drawLine(x, y) {
    y += 7.5;
    this.canvasHelper.line(x, y, 50, 5);
  }

  _drawBall(x, y) {
    const that = this;
    this.canvasHelper.draw(DrawStyle.Stroke, () => {
      that.canvasHelper.move(x += 25, y);
      that.canvasHelper.curve(x + 20, y, x + 25, y + 7, x += 25, y += 10);
      that.canvasHelper.curve(x, y + 3, x - 5, y + 10, x -= 25, y += 10);
      that.canvasHelper.curve(x - 20, y, x - 25, y - 7, x -= 25, y -= 10);
      that.canvasHelper.curve(x, y - 3, x + 5, y - 10, x += 25, y -= 10);
      that.canvasHelper.move(x -= 24.6, y += 9);
      that.canvasHelper.curve(x + 10, y + 5, x + 30, y + 8, x += 49.2, y);
      that.canvasHelper.move(x -= 15, y -= 8.4);
      that.canvasHelper.curve(x - 2, y + 3, x - 2, y + 8, x, y += 12.4);
      that.canvasHelper.move(x -= 10, y -= 12.9);
      that.canvasHelper.curve(x - 2, y + 5, x - 2, y + 9, x, y += 13.5);
      that.canvasHelper.move(x -= 10, y -= 12.6);
      that.canvasHelper.curve(x - 2, y + 3, x - 2, y + 8, x, y + 12.4);
    });
  }
}
