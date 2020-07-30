import RomanConverter from './roman-converter';
import MayanConverter from './mayan-converter';
import LetterConverter from './letter-converter';

require('./assets/css/styles.css');
require('./assets/images/favicon.png');
const { NodeList } = window;

NodeList.prototype.forEach = NodeList.prototype.forEach || function(callback, thisArg) {
  thisArg = thisArg || window;
  for (let i = 0; i < this.length; i += 1) {
    callback.call(thisArg, this[i], i, this);
  }
};

(() => {
  setLang(document.querySelector('.lang'));
  setMenu(document.querySelector('.menu nav'));
  // eslint-disable-next-line no-new
  new RomanConverter(document.querySelector('.roman'));
  // eslint-disable-next-line no-new
  new MayanConverter(document.querySelector('.mayan'));
  const letterConverter = new LetterConverter(document.querySelector('.letter'));

  function setLang(container) {
    container.addEventListener('click', (evt) => {
      const a = evt.target;
      if (a.dataset.lang) {
        document.querySelector('html').lang = a.dataset.lang;
        container.querySelectorAll('a').forEach((opt) => {
          if (opt === a) {
            opt.classList.add('active');
          } else {
            opt.classList.remove('active');
          }
        });
        const title = document.querySelector(`h1 *[lang=${a.dataset.lang}]`).textContent;
        document.title = title;

        letterConverter.refresh();
      }
    });
  }

  function setMenu(menu) {
    menu.addEventListener('click', menuOptionClick);
  }

  function menuOptionClick(evt) {
    const target = evt.target;
    const option = target.dataset.option || target.parentElement.dataset.option;

    if (option) {
      const menu = this.querySelectorAll('*[data-option]');
      const panels = document.querySelectorAll('.panels .panel');
      menu.forEach((item) => {
        if (item.dataset.option === option) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      panels.forEach((panel) => {
        if (panel.classList.contains(option)) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    }
  }
})();
