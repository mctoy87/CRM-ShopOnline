// создает td в th, куда рендерятся свойства объекта
/*
1. вариант изменения цены (price) с учетом discont
obj.discount ? (obj.price - (obj.price * obj.discount / 100)) : obj.price
2. вариант изменения общей цены (total price) с учетом discont
obj.discount ? (obj.price - (obj.price * obj.discount / 100)) * obj.count :
obj.price * obj.count
*/
export const createRow = (obj) => {
  const tableRow = document.createElement('tr');
  tableRow.classList.add('table__row');
  tableRow.insertAdjacentHTML('afterbegin',
      `<td class ="table__id">${obj.id}</td>
    <td class ="table__name">${obj.title}</td>
    <td class ="table__category">${obj.category}</td>
    <td class="table__measure">${obj.units}</td>
    <td class="table__quantity">${obj.count}</td>
    
    <td class="table__price">${obj.price}</td>
    <td class="table__total">${obj.price * obj.count}</td>
    <td>
      <button
        class="table__picture" 
        type="button"
        data-pic="../icons/turbo.jpg"
      >
      </button>
    </td>
    <td>
      <button class="table__edit" type="button" data-id= "${obj.id}"></button>
    </td>
    <td>
      <button class="table__delete" type="button" data-id= "${obj.id}"></button>
    </td>
    `,
  );
  return tableRow;
};

