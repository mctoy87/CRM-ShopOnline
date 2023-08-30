import {showSum} from './view.js';
import {getRenderGoods} from './render.js';
import {fetchRequest} from './render.js';
import getElement from './getElement.js';
import {URL} from './render.js';
import loadstyle from './loadstyle.js';


const {
  modalOpen,
} = getElement;

const showModal = async (err, data) => {
  await loadstyle('../styles/form.css');
  // создаем модалку
  const overlay = document.createElement('div');
  overlay.classList.add('modal');
  document.body.append(overlay);
  const modalBody = document.createElement('div');
  modalBody.classList.add('modal__body');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal__title', 'title');
  modalTitle.textContent = 'Добавить товар';
  const modalForm = document.createElement('form');
  modalForm.classList.add('modal__form', 'form');
  modalForm.action = 'https://jsonplaceholder.typicode.com/posts';
  modalForm.method = 'POST';
  modalForm.id = 'modal';
  overlay.append(modalBody);
  modalBody.append(modalTitle, modalForm);
  modalForm.insertAdjacentHTML(
      'afterbegin', `
      <fieldset class="form__box">
        <label class="form__label form__name">
          <span class="form__label-text">Наименование</span>
          <input class="form__input" 
                type="text" name="title" id="name" required>
        </label>

        <label class="form__label form__category">
          <span class="form__label-text">Категория</span>
          <input class="form__input" 
            type="text" name="category" id="category" required>
        </label>


        <label class="form__label form__units">
          <span class="form__label-text">Единицы измерения</span>
          <input class="form__input" 
            type="text" name="units" id="units" required>
        </label>

        <div class="form__discount">
          <label class="form__label" for="discount">
            <span class="form__label-text">Дисконт</span>
          </label>
          
          <div class="form__discount-wrap">
            <input class="form__checkbox" 
              type="checkbox" name="discount" id="discount">
            <label class="form__checkbox-label" for="discount"></label>
            <input class="form__input form__input_disabled" id="discont"
              type="number" name="discount_card" placeholder ="%" disabled>
          </div>
        </div>

        <label class="form__label form__description">
          <span class="form__label-text">Описание</span>
          <textarea class="form__text-area form__input" 
            name="description" id="description" minlength="80" 
            required></textarea>
        </label>

        <label class="form__label form__count">
          <span class="form__label-text">Количество</span>
          <input class="form__number-input form__input" 
            type="number" name="count" id="count" required>
        </label>

        <label class="form__label form__price">
          <span class="form__label-text form__number">Цена</span>
          <input class="form__price-input form__input" 
            type="number" name="price" id="price" required>
        </label>

        <label class="form__image-label form-btn" for="image" tabindex="0">
          <span class="form__image-text">Добавить изображение</span>
          <input class="form__image visually-hidden" 
            type="file" name="image" id="image">
        </label>
      </fieldset>

      <div class="form__cost-wrap">
        <p class="form__total-cost-txt total-cost-txt">Итоговая стоимость:
          <span class="form__total-cost total-cost">$ 900.00</span>
        </p>
        <button class="form__submit form-btn" 
          type="submit" form="modal">Добавить товар</button>
      </div>

    </form>

    <button class="modal__close" type="button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2L22 22" stroke="currentColor" 
          stroke-width="3" stroke-linecap="round"/>
        <path d="M2 22L22 2" stroke="currentColor" 
          stroke-width="3" stroke-linecap="round"/>
        </svg>        
    </button>

    <div class="modal__error visually-hidden">
      <div class="modal__error-wrap">
      </div>
      <p class= "modal__error-text">Что-то пошло не так</p>
      <button class="modal__error-close" type="button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L22 22" stroke="currentColor" 
            stroke-width="3" stroke-linecap="round"/>
          <path d="M2 22L22 2" stroke="currentColor" 
            stroke-width="3" stroke-linecap="round"/>
        </svg>        
      </button>
    </div>
  </div>`,
  );

  if (data) {
    modalForm.elements.title.value = `${data.title}`;
    modalForm.elements.category.value = `${data.category}`;
    modalForm.elements.units.value = `${data.units}`;
    modalForm.elements.description.value = `${data.description}`;
    modalForm.elements.count.value = `${data.count}`;
    modalForm.elements.price.value = `${data.price}`;
    /*
    изменить значение инпута со скидкой
    */
    if (data.discount) {
      modalForm.elements.discont.removeAttribute('disabled');
      modalForm.elements.discount.checked = true;
      modalForm.elements.discont.value = `${data.discount}`;
    }
  }

  // new Promise(resolve => {
  //   overlay.addEventListener('click', e => {
  //     const target = e.target;
  //     console.log(target);
  //     if (target === overlay ||
  //       (target.classList.contains('modal__body')) ||
  //       target.closest('.modal__close')) {
  //       overlay.classList.add('modal_display-none');
  //       resolve(false);
  //     }
  //   });
  // });

  // закрытие модалки на крестик и overlay
  overlay.addEventListener('click', e => {
    const target = e.target;
    if ((target === overlay) ||
        (target.classList.contains('modal__body')) ||
        target.closest('.modal__close')) {
      // сброс формы при выходе
      const modalForm = document.querySelector('.modal__form');
      const modalDiscontInput = document.querySelector('.form__input_disabled');
      modalForm.reset();
      modalDiscontInput.setAttribute('disabled', '');
      overlay.remove();
    }
    // закрытие окна с ошибкой "Что-то пошло не так"
    const modalError = document.querySelector('.modal__error');
    if ((target === overlay) ||
        target.closest('.modal__error-close')) {
      // скрыть окошко об ошибке с сервера
      modalError.classList.add('visually-hidden');
    }
  });

  // добавить картинку в preview из модалки
  const file = modalForm.elements.image;
  const wrapper = document.createElement('div');
  wrapper.classList.add('form__img-preview-wrapper');
  const img = document.createElement('img');
  img.classList.add('form__img-preview');
  wrapper.append(img);
  modalForm.append(wrapper);
  file.addEventListener('change', () => {
    if (file.files.length > 0) {
      if (file.files[0].size > 1_000_000) {
        const modalFieldset = document.querySelector('.form__box');
        const stopTxt = document.createElement('p');
        stopTxt.classList.add('modal__stopText');
        stopTxt.textContent = 'Изображение не должно превышать размер 1 Мб';
        modalFieldset.append(stopTxt);
        img.src = '';
      } else {
        const stopTxt = document.querySelector('.modal__stopText');
        if (stopTxt) stopTxt.remove();
        const objURL = window.URL.createObjectURL(file.files[0]);
        img.src = objURL;
      }
    }
  });

  // AJAX POST Fetch
  // const modalForm = document.querySelector('.modal__form');
  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    // запрос к серверу
    fetchRequest(URL, {
      method: 'POST',
      body: {
        title: modalForm.title.value,
        description: modalForm.description.value,
        price: modalForm.price.value,
        count: modalForm.count.value,
        units: modalForm.units.value,
        category: modalForm.category.value,
        discount: modalForm.discont.value,
      },
      callback(err, data) {
        if (err || data === null) {
          console.warn(err, data);
          // const modalDisplay = document.querySelector('.modal');
          // modalDisplay.classList.remove('modal_display-none');
          const modalError = document.querySelector('.modal__error');
          modalError.classList.remove('visually-hidden');
          return;
        }
        console.log(`Заявка успешно отправлена. Номер заявки ${data.id}`);
        getRenderGoods();
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // const formData = new FormData(e.target);
    // data.push(Object.fromEntries(formData));

    // renderGoods([Object.fromEntries(formData)]);
    // отображение корректной общей суммы в таблице
    // showSum();

    modalForm.reset();
    const modalDiscontInput = document.querySelector('.form__input_disabled');
    modalDiscontInput.setAttribute('disabled', '');

    // закрытие модалки
    overlay.remove();
  });

  // снимает disabled с input discount
  modalForm.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.form__checkbox')) {
      const modalDiscontInput = document.querySelector('.form__input_disabled');
      if (modalDiscontInput.hasAttribute('disabled')) {
        modalDiscontInput.removeAttribute('disabled');
      } else {
        // сброс введенного значения
        modalDiscontInput.value = '';
        modalDiscontInput.setAttribute('disabled', '');
      }
    }
  });

  // отображение корректной общей суммы в модалке
  // при смене фокуса на price
  modalForm.price.addEventListener('change', e => {
    const pageTotalCost = document.querySelector('.page__total-cost');
    const modalTotalCost = document.querySelector('.form__total-cost');
    const modalDiscontInput = document.querySelector('.form__input_disabled');
    const pageSum = +pageTotalCost.textContent.substring(1);
    const count = +modalForm.count.value;
    const price = +e.target.value;
    if ((modalForm.count.value !== '') && (modalDiscontInput.value !== '')) {
      modalTotalCost.textContent = '';
      const total = pageSum + count * price - (
        count * price * 0.01 * +modalDiscontInput.value);
      modalTotalCost.textContent = `$ ${total.toFixed(2)}`;
    } else if (modalForm.count.value !== '') {
      modalTotalCost.textContent = '';
      const total = pageSum + count * price;
      modalTotalCost.textContent = `$ ${total.toFixed(2)}`;
    }
  });
  // при смене фокуса на count
  modalForm.count.addEventListener('change', e => {
    const pageTotalCost = document.querySelector('.page__total-cost');
    const modalTotalCost = document.querySelector('.form__total-cost');
    const modalDiscontInput = document.querySelector('.form__input_disabled');
    const pageSum = +pageTotalCost.textContent.substring(1);
    const price = +modalForm.price.value;
    const count = +e.target.value;
    if ((modalForm.price.value !== '') && (modalDiscontInput.value !== '')) {
      modalTotalCost.textContent = '';
      const total = pageSum + price * count - (
        price * count * 0.01 * +modalDiscontInput.value);
      modalTotalCost.textContent = `$ ${total.toFixed(2)}`;
    } else if (modalForm.price.value !== '') {
      modalTotalCost.textContent = '';
      const total = pageSum + price * count;
      modalTotalCost.textContent = `$ ${total.toFixed(2)}`;
    }
  });
  // валидация ввода символов в модалке
  modalForm.addEventListener('input', e => {
    /* поле наименование, категория и описание
    разрешите ввод только кириллицу и пробел */
    const regExp = /[^А-яЁё ]/g;
    modalForm.title.value = modalForm.title.value.replace(regExp, '');
    modalForm.category.value = modalForm.category.value.replace(regExp, '');
    modalForm.description.value = modalForm.description.value.replace(regExp,
        '');
    // поле единицы измерения только кириллицу
    const regExp2 = /[^А-яЁё]/g;
    modalForm.units.value = modalForm.units.value.replace(regExp2, '');
    // поле количество, дисконт и цена разрешите ввод только цифр
    const regExp3 = /\D/g;
    modalForm.count.value = modalForm.count.value.replace(regExp3, '');
    modalForm.price.value = modalForm.price.value.replace(regExp3, '');
    modalForm.discont.value = modalForm.discont.value.replace(regExp3, '');
  });

  // showModal возвращает response
  return data;
};

const modalControl = async () => {
  // открытие модалки
  modalOpen.addEventListener('click', async ({target}) => {
    await showModal();
    const modalTotalCost = document.querySelector('.form__total-cost');
    modalTotalCost.textContent = '';
    modalTotalCost.textContent = showSum();
  });

  // таблица
  const table = document.querySelector('table');
  // кнопка редактировать
  table.addEventListener('click', async e => {
    const target = e.target;
    if (target.classList.contains('table__edit')) {
      // console.log(`${target.dataset.id}`);
      const result = await fetchRequest(`${URL}/${target.dataset.id}`, {
        method: 'GET',
        callback: showModal,
      });
      const modalTotalCost = document.querySelector('.form__total-cost');
      modalTotalCost.textContent = '';
      modalTotalCost.textContent = showSum();
      // console.log(`result: ${result.id}`);
    }
  });
  // кнопка удалить (корзина)
  table.addEventListener('click', async e => {
    const target = e.target;
    if (target.closest('.table__delete')) {
      console.log(target.dataset.id);
      const result = await fetchRequest(`${URL}/${target.dataset.id}`, {
        method: 'DELETE',
        callback: getRenderGoods,
      });
    }
    // открыть через кнопку добавления картинки
    if (target.closest('.table__picture')) {
      console.log('Картинка');
      const topPic = (screen.height - 600) / 2;
      const widthPic = (screen.width - 600) / 2;
      window.open(target.dataset.pic, '', `
        width=600, height=600, top=${topPic}, left=${widthPic}`);
    }
  });
};

export default {
  modalControl,
};
