export default class LetterEnglishConverter {
  convert(value, hasPreviousValue) {
    let part = 0;

    const blocks = {
      quadrillion: 1000000000000000,
      trillion: 1000000000000,
      billion: 1000000000,
      million: 1000000,
      thousand: 1000,
      hundred: 100
    };

    if (value < 0) {
      return `negative ${this.convert(Math.abs(value))}`;
    }

    for (const block in blocks) {
      if (value >= blocks[block]) {
        part = Math.floor(value / blocks[block]);
        value -= part * blocks[block];
        return `${this.convert(part)} ${block} ${this.convert(value, true)}`;
      }
    }

    if (value > 20 && value % 10 > 0) {
      part = Math.floor(value / 10) * 10;
      return `${this.convert(part)} ${this.convert(value - part, true)}`;
    }

    return this._fixedValues(value, hasPreviousValue);
  }

  _fixedValues(value, hasPreviousValue) {
    switch (value) {
      case 0: return hasPreviousValue ? '' : 'zero';
      case 1: return 'one';
      case 2: return 'two';
      case 3: return 'three';
      case 4: return 'four';
      case 5: return 'five';
      case 6: return 'six';
      case 7: return 'seven';
      case 8: return 'eight';
      case 9: return 'nine';
      case 10: return 'ten';
      case 11: return 'eleven';
      case 12: return 'twelve';
      case 13: return 'thirteen';
      case 14: return 'fourteen';
      case 15: return 'fifteen';
      case 16: return 'sixteen';
      case 17: return 'seventeen';
      case 18: return 'eighteen';
      case 19: return 'nineteen';
      case 20: return 'twenty';
      case 30: return 'thirty';
      case 40: return 'fourty';
      case 50: return 'fifty';
      case 60: return 'sixty';
      case 70: return 'seventy';
      case 80: return 'eighty';
      case 90: return 'ninety';
      default: return null;
    }
  }
}
