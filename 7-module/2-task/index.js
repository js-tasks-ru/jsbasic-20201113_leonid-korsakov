import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  }
  open () {
    document.body.className = 'is-modal-open';
    this.container = document.createElement('div');
    this.container.classList.add('container', 'modal-container');
    
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const overlay = document.createElement('div');
    overlay.classList.add('modal__overlay');

    const modalInner = document.createElement('div');
    modalInner.classList.add('modal__inner');
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal__header');
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('modal__close');
    button.innerHTML = '<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />';

    const h3 = document.createElement('h3');
    h3.classList.add('modal__title');
    h3.textContent = this.title;

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal__body');
    modalBody.innerHTML = `<b>${this.node}</b>`

    modal.append(overlay);
    modalHeader.append(button);
    modalHeader.append(h3);
    modalInner.append(modalHeader);
    modalInner.append(modalBody);
    modal.append(modalInner);
    this.container.append(modal);
    document.body.append(this.container);

    this.container.addEventListener('click', event => {
      if (event.target.closest('button')) {
        this.close();
      }
    });

    document.addEventListener('keydown', event => {
      document.body.classList.remove('is-modal-open');
      if (document.body.querySelector('.modal-container')) {
        document.body.querySelector('.modal-container').remove();
      }
    });
  }
  setTitle (modalTitle) {
    this.title = modalTitle;
  }

  setBody (node) {
    this.node = node.outerHTML;
  }

  close() {
    document.body.classList.remove('is-modal-open');
    if (document.body.querySelector('.modal-container')) {
      document.body.querySelector('.modal-container').remove();
    }
  }
}
