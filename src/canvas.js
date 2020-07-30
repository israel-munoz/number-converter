import Symbol from 'es6-symbol';

export const DrawStyle = Object.freeze({
  Fill: Symbol('fill'),
  Stroke: Symbol('stroke'),
  Both: Symbol('both')
});

export default class Canvas {
  get height() {
    return this.canvas.height;
  }

  set height(value) {
    this.canvas.height = value * this.unit;
  }

  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.unit = 3;
    this.radius = 5;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(drawStyle, func) {
    this.context.beginPath();
    func();
    if (drawStyle === DrawStyle.Stroke || drawStyle === DrawStyle.Both) {
      this.context.lineWidth = 1.5 * this.unit;
      this.context.stroke();
    }
    if (drawStyle === DrawStyle.Fill || drawStyle === DrawStyle.Both) {
      this.context.fill();
    }
    this.context.closePath();
  }

  move(x, y) {
    x *= this.unit;
    y *= this.unit;
    this.context.moveTo(x, y);
  }

  circle(x, y, radius) {
    radius = (radius || this.radius) * this.unit;
    x *= this.unit;
    y *= this.unit;
    this.draw(DrawStyle.Fill, () => {
      this.context.arc(x + radius, y + radius, radius, 0, 360);
    });
  }

  line(x, y, width, height) {
    x *= this.unit;
    y *= this.unit;
    width *= this.unit;
    height *= this.unit;
    this.draw(DrawStyle.Fill, () => {
      this.context.rect(x, y, width, height);
    });
  }

  curve(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.context.bezierCurveTo(
      cp1x * this.unit,
      cp1y * this.unit,
      cp2x * this.unit,
      cp2y * this.unit,
      x * this.unit,
      y * this.unit);
  }
}
