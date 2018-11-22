import { MayanConverter } from './mayan-converter';
import { RomanConverter } from './roman-converter';

require('./assets/css/styles.css');
require('./assets/images/favicon.png');

NodeList.prototype.forEach = NodeList.prototype.forEach || function(callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i += 1) {
        callback.call(thisArg, this[i], i, this);
    }
};

(() => {
    setLang(document.querySelector('.lang'));
    setMenu(document.querySelector('.menu nav'));
    const romanConverter = new RomanConverter(document.querySelector('.roman'));
    const mayanConverter = new MayanConverter(document.querySelector('.mayan'));

    function setLang(container: HTMLElement) {
        container.addEventListener('click', (evt: Event) => {
            const a = evt.target as HTMLElement;
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
            }
        });
    }

    function setMenu(menu: HTMLElement) {
        menu.addEventListener('click', menuOptionClick);
    }

    function menuOptionClick(evt: Event) {
        const target = evt.target as HTMLElement;
        const option = target.dataset.option || target.parentElement.dataset.option;

        if (option) {
            const menu = this.querySelectorAll('*[data-option]');
            const panels = document.querySelectorAll('.panels .panel');
            menu.forEach((item: HTMLElement) => {
                if (item.dataset.option === option) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            panels.forEach((panel: HTMLElement) => {
                if (panel.classList.contains(option)) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        }
    }
})();
