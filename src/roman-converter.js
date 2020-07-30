export default class RomanConverter {
  constructor(container) {
    const that = this;
    const input = container.querySelector('.input-control');
    const output = container.querySelector('.output-control');
    input.addEventListener('input', () => {
      output.value = that._toRoman(input.valueAsNumber || Number(input.value));
    });
  }

  _toRoman(input) {
    const that = this;
    let result = '';

    if (input >= 1000) {
      const m = Math.floor(input / 1000);
      for (let i = 0; i < m; i += 1) {
        result += 'M';
      }
      input -= (m * 1000);
    }
    const c = Math.floor(input / 100);
    if (c > 0) {
      result += that._digitToRoman(c, 'C', 'D', 'M');
      input -= c * 100;
    }
    const x = Math.floor(input / 10);
    if (x > 0) {
      result += that._digitToRoman(x, 'X', 'L', 'C');
      input -= x * 10;
    }
    result += that._digitToRoman(input, 'I', 'V', 'X');
    return result;
  }

  _digitToRoman(digit, unit, middle, next) {
    let result = '';
    if (digit === 4) {
      result = unit + middle;
    } else if (digit === 5) {
      result = middle;
    } else if (digit === 9) {
      result = unit + next;
    } else {
      let j;
      if (digit > 5) {
        j = digit - 5;
        result = middle;
      } else {
        j = digit;
      }
      for (let i = 0; i < j; i += 1) {
        result += unit;
      }
    }
    return result;
  }
}
