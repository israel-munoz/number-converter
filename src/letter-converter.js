import LetterEnglishConverter from './letter-en-converter';
import LetterSpanishConverter from './letter-es-converter';

export default class LetterConverter {
  constructor(container) {
    const maxNumber = 9007199254740990;
    const minNumber = maxNumber * -1;
    const input = container.querySelector('.input-control');
    const output = container.querySelector('.output-control');
    input.max = maxNumber;
    input.min = minNumber;
    input.addEventListener('input', () => this.refresh());

    this.container = container;
    this.input = input;
    this.output = output;
  }

  refresh() {
    const input = this.input;
    const output = this.output;
    let value = input.valueAsNumber || Number(input.value);
    if (value > input.max) {
      value = Number(input.max);
      setTimeout(() => {
        input.valueAsNumber = value;
        input.value = value;
      }, 1);
    }
    const lang = this._getLang();
    let converter;
    if (lang === 'es') {
      converter = new LetterSpanishConverter();
    } else {
      converter = new LetterEnglishConverter();
    }
    let text = converter.convert(value);

    if (text !== 'zero' && /zero$/.test(text)) {
      text = text.substring(0, text.lastIndexOf('zero')).trim();
    }

    output.value = text;
  }

  _getLang() {
    return document.querySelector('html').lang;
  }
}
