import { Canvas, DrawStyle } from './canvas';

export class MayanConverter {
    private canvasHelper: Canvas;

    constructor(container: HTMLElement) {
        const input: HTMLInputElement = container.querySelector('.input-control');
        const output: HTMLCanvasElement = container.querySelector('.output-control');
        this.canvasHelper = new Canvas(output);

        input.addEventListener('input', () => {
            this.drawMayanNumber(input.valueAsNumber || Number(input.value));
        });
    }

    private drawMayanNumber(value: number) {
        this.canvasHelper.clear();
        const blocks: number[] = [];
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
            this.drawBlock(i * blockSize, block);
        });
    }

    private drawBlock(position: number, value: number) {
        const padding = 10;
        const x = padding;
        let y = position + padding;
        let fives: number;
        let fours: number;
        if (value === 0) {
            this.drawBall(x, y);
        } else if (value > 5) {
            fives = Math.floor(value / 5);
            fours = value - fives * 5;
        } else {
            fives = 0;
            fours = value;
        }
        this.drawBlockLine(fours, x, y);
        for (let i = 1; i <= fives; i += 1) {
            this.drawBlockLine(5, x, y += 10);
        }
    }

    private drawBlockLine(value: number, x: number, y: number) {
        if (value < 5) {
            this.drawDots(value, x, y);
        } else if (value === 5) {
            this.drawLine(x, y);
        }
    }

    private drawDots(value: number, x: number, y: number) {
        x += (50 / 2) - (value * 12.5 / 2);
        let xx;
        for (let i = 0; i < value; i += 1) {
            xx = x + i * 12.5;
            this.canvasHelper.circle(xx, y);
        }
    }

    private drawLine(x: number, y: number) {
        y += 7.5;
        this.canvasHelper.line(x, y, 50, 5);
    }

    private drawBall(x: number, y: number) {
        this.canvasHelper.draw(DrawStyle.Stroke, () => {
            this.canvasHelper.move(x += 25, y);
            this.canvasHelper.curve(x + 20, y, x + 25, y + 7, x += 25, y += 10);
            this.canvasHelper.curve(x, y + 3, x - 5, y + 10, x -= 25, y += 10);
            this.canvasHelper.curve(x - 20, y, x - 25, y - 7, x -= 25, y -= 10);
            this.canvasHelper.curve(x, y - 3, x + 5, y - 10, x += 25, y -= 10);
            this.canvasHelper.move(x -= 24.6, y += 9);
            this.canvasHelper.curve(x + 10, y + 5, x + 30, y + 8, x += 49.2, y);
            this.canvasHelper.move(x -= 15, y -= 8.4);
            this.canvasHelper.curve(x - 2, y + 3, x - 2, y + 8, x, y += 12.4);
            this.canvasHelper.move(x -= 10, y -= 12.9);
            this.canvasHelper.curve(x - 2, y + 5, x - 2, y + 9, x, y += 13.5);
            this.canvasHelper.move(x -= 10, y -= 12.6);
            this.canvasHelper.curve(x - 2, y + 3, x - 2, y + 8, x, y + 12.4);
        });
    }
}
