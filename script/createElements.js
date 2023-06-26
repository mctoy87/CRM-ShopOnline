// создает td в th, куда рендерятся свойства объекта
export const createRow = (obj) => {
  const tableRow = document.createElement('tr');
  tableRow.classList.add('table__row');
  tableRow.insertAdjacentHTML('afterbegin',
      `<td class ="table_id">${obj.id}</td>
    <td>${obj.title}</td>
    <td>${obj.category}</td>
    <td class="table__measure">${obj.units}</td>
    <td class="table__quantity">${obj.count}</td>
    <td class="table__price">$${obj.price}</td>
    <td class="table__total">$${obj.price * obj.count}</td>
    <td>
      <button
        class="table__picture" 
        type="button"
        data-pic="../icons/turbo.jpg">
      </button>
    </td>
    <td>
      <button class="table__edit" type="button"></button>
    </td>
    <td>
      <button class="table__delete" type="button"></button>
    </td>
    `,
  );
  return tableRow;
};

