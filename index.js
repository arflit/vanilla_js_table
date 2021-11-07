const table = document.querySelector('.table'); // таблица
const addRowButton = document.querySelector('.add-row'); // кнопка "добавить ряд"
const rowTemplate = document.querySelector('#row').content; // шаблон строки
const cellTemplate = document.querySelector('#cell').content; // шаблон ячейки

const addRow = () => {
  const row = rowTemplate.querySelector('.row').cloneNode(true); // копируем из шаблона строку
  table.append(row); // добавляем её в конец таблицы
};

addRowButton.addEventListener('click', addRow); // добавляем на кнопку "добавить ряд" слушатель событий

const addCell = (e) => { // e - event - событие, на которое вызвана функция. В данном случае клик куда-то в таблице. 
  // e.target - тот элемент, по которому кликнули 
  if (e.target.className !== 'add-cell') return; // если нажали не на кнопку "добавить ячейку" - выходим из функции
  const row = e.target.parentNode.parentNode; // ячейку надо добавить в строку. Строка - на 2 уровня выше по DOM, чем кнопка, на которую жали
  const cell = cellTemplate.querySelector('.cell').cloneNode(true); // копируем из шаблона новую ячейку
  row.append(cell); // добавляем её в конец строки
} 

table.addEventListener('click', addCell); // слушатель событий - один на всю таблицу, а сработает именно там, где нажали кнопку

const changeCellColor = (cell, color) => { // функция принимает на вход ячейку и цвет 
  cell.classList.remove('red'); // удаляются css-классы всех цветов
  cell.classList.remove('green');
  cell.classList.remove('blue');
  cell.classList.add(color); // добавляется css-класс нужного цвета, ячейка перекрасилась
}

const changeRowColor = (row, color) => { // функция принимает на вход строку и цвет 
  const cells = row.querySelectorAll('.cell'); // все ячейки в строке
  for (const cell of cells) { // обходим циклом все ячейки
    const options = cell.querySelectorAll('option'); // выбираем нужный вариант в выпадающем списке:
    for (const option of options) { 
      if (option.hasAttribute('selected')) { // деактивируем активную опцию
        option.removeAttribute('selected');
      }
    }
    const option = cell.querySelector(`.${color}`); 
    option.setAttribute('selected', true); // выставялем ту опцию, которая передана в функцию
    changeCellColor(cell, color); // ну и не забываем собственно покрасить ячейку
  }
}

const colorSelectHandler = (e) => {
  const value = e.target.value; // цвет, который выбрали в выпадающем списке
  if (e.target.parentNode.className === "row-header") { // если это заголовок строки
    const row = e.target.parentNode.parentNode; // выбираем строку
    changeRowColor(row, value); // перекрашиваем строку 
  } else {
    const cell = e.target.parentNode; // выбираем ячейку
    changeCellColor(cell, value); // перекрашиваем ячейку
  }
};

table.addEventListener('change', colorSelectHandler); // один обработчик на всю таблицу: в функцию colorSelectHandler передаётся конкретный выпадающий список, в котором что-то поменяли 
