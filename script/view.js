import getElement from './getElement.js';


const {
  pageTotalCost,
} = getElement;

// показать общую сумму на таблице
export const showSum = () => {
  pageTotalCost.textContent = '';
  const totalPrice = document.querySelectorAll('.table__total');

  const sum = [...totalPrice].reduce((total, amount) => {
    total += +amount.textContent;
    return total;
  }, 0);

  pageTotalCost.textContent = `$ ${sum.toFixed(2)}`;
  return pageTotalCost.textContent;
};

/* показать картинку в новой вкладке*/
export const showImage = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  if (data.image) {
    console.log(data.image);
    const topPic = (screen.height - 600) / 2;
    const widthPic = (screen.width - 600) / 2;

    window.open(`http://localhost:3000/${data.image}`, '', `
      width=600, height=600, top=${topPic}, left=${widthPic}`);
  }
};
