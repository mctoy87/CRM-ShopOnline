import getElement from './getElement.js';

const {
  pageTotalCost,
} = getElement;

// показать общую сумму на таблице
export const showSum = () => {
  pageTotalCost.textContent = '';
  const totalPrice = document.querySelectorAll('.table__total');

  const sum = [...totalPrice].reduce((total, amount) => {
    total += +amount.textContent.substring(1);
    return total;
  }, 0);

  pageTotalCost.textContent = `$ ${sum.toFixed(2)}`;
  return pageTotalCost.textContent;
};
