export default class LetterSpanishConverter {
  convert(value, hasPreviousValue) {
    let part = 0;
    let text;
    const m = 1000000;
    const m2 = 2000000;
    const b = 1000000000000;
    const b2 = 2000000000000;
    const t = 1000000000000000000n;
    const t2 = 2000000000000000000n;

    if (value < 0) {
      return 'menos ' + this.convert(Math.abs(value));
    }

    text = this._fixedValues(value, hasPreviousValue);

    if (text) {
      return text;
    }

    if (value < m) {
      return this._groupToText(Number(value), hasPreviousValue);
    }

    if (value < m2) {
      return `un millón ${this.convert(value % m)}`;
    }

    if (value < b) {
      part = Math.floor(value / m);
      text = `${this.convert(part)} millones`;
      part = value - part * m;
      if (part > 0) {
        text = `${text} ${this.convert(part)}`;
      }
      return text;
    }

    if (value < b2) {
      return `un billón ${this.convert(value % b)}`;
    }

    if (value < t) {
      part = Math.floor(value / b);
      text = `${this.convert(part)} billones`;
      part = value - part * b;
      if (part > 0) {
        text = `${text} ${this.convert(part)}`;
      }
      return text;
    }

    if (value < t2) {
      return `un trillón ${this.convert(value % t)}`;
    }

    part = Math.floor(value / t);
    text = `${this.convert(part)} trillones`;
    part = value - part * t;
    if (part > 0) {
      text = `${text} ${this.convert(part)}`;
    }

    if (text !== 'cero' && /cero$/.test(text)) {
      text = text.substring(0, text.lastIndexOf('cero'));
    }

    return text.trim();
  }

  _groupToText(value, hasPreviousValue) {
    let text = this._fixedValues(value, hasPreviousValue);

    if (text) {
      return text;
    }

    if (value < 20) {
      return `dieci${this.convert(value - 10)}`;
    }

    if (value < 30) {
      return `veinti${this.convert(value - 20)}`;
    }

    if (value < 100) {
      const u = value % 10;
      return `${this.convert(Math.floor(value / 10) * 10)} y ${(u === 1 ? 'un' : this.convert(u))}`;
    }

    if (value < 200) {
      return `ciento ${this.convert(value - 100)}`;
    }

    if (value < 1000) {
      return `${this.convert(Math.floor(value / 100) * 100)} ${this.convert(value % 100)}`;
    }

    if (value < 2000) {
      return `mil ${this.convert(value % 1000)}`;
    }

    text = `${this.convert(Math.floor(value / 1000))} mil`;
    if ((value % 1000) > 0) {
      text = `${text} ${this.convert(value % 1000)}`;
    }
    return text;
  }

  _fixedValues(value, hasPreviousValue) {
    switch (value) {
      case 0: return hasPreviousValue ? '' : 'cero';
      case 1: return 'uno';
      case 2: return 'dos';
      case 3: return 'tres';
      case 4: return 'cuatro';
      case 5: return 'cinco';
      case 6: return 'seis';
      case 7: return 'siete';
      case 8: return 'ocho';
      case 9: return 'nueve';
      case 10: return 'diez';
      case 11: return 'once';
      case 12: return 'doce';
      case 13: return 'trece';
      case 14: return 'catorce';
      case 15: return 'quince';
      case 20: return 'veinte';
      case 30: return 'treinta';
      case 40: return 'cuarenta';
      case 50: return 'cincuenta';
      case 60: return 'sesenta';
      case 70: return 'setenta';
      case 80: return 'ochenta';
      case 90: return 'noventa';
      case 100: return 'cien';
      case 200:
      case 300:
      case 400:
      case 600:
      case 800:
        return `${this.convert(Math.floor(value / 100))}cientos`;
      case 500: return 'quinientos';
      case 700: return 'setecientos';
      case 900: return 'novecientos';
      case 1000: return 'mil';
      case 1000000: return 'un millón';
      default: return null;
    }
  }
}
