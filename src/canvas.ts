export enum DrawStyle {
    Fill,
    Stroke,
    Both
}

export class Canvas {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly unit: number;
    private readonly radius: number;

    public set height(value: number) {
        this.canvas.height = value * this.unit;
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.unit = 3;
        this.radius = 5;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(drawStyle: DrawStyle, func: () => void) {
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

    move(x: number, y: number) {
        x *= this.unit;
        y *= this.unit;
        this.context.moveTo(x, y);
    }

    circle(x: number, y: number, radius?: number) {
        radius = (radius || this.radius) * this.unit;
        x *= this.unit;
        y *= this.unit;
        this.draw(DrawStyle.Fill, () => {
            this.context.arc(x + radius, y + radius, radius, 0, 360);
        });
    }

    line(x: number, y: number, width: number, height: number) {
        x *= this.unit;
        y *= this.unit;
        width *= this.unit;
        height *= this.unit;
        this.draw(DrawStyle.Fill, () => {
            this.context.rect(x, y, width, height);
        });
    }

    curve(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
        this.context.bezierCurveTo(
            cp1x * this.unit,
            cp1y * this.unit,
            cp2x * this.unit,
            cp2y * this.unit,
            x * this.unit,
            y * this.unit);
    }
}
