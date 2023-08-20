// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minweightInput = document.querySelector('.minweight__input');// поле минимального веса для фильтрации
const maxweightInput = document.querySelector('.maxweight__input');// поле максимального веса для фильтрации

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let colorsFruits = [
  'желтый', 
  'розовый', 
  'зеленый', 
  'светло-коричневый',
  'розово-красный',  
  'коричневый', 
  'синий', 
  'фиолетовый'
];

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  
  while (fruitsList.firstChild) {
    fruitsList.firstChild.remove();
  }
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  for (let i = 0; i < fruits.length; i++) {
    let newLi = document.createElement('li');
    newLi.className = 'fruit__item';
    fruitsList.append(newLi);

    let newDiv = document.createElement('div');
    newDiv.className = 'fruit__info';
    newLi.append(newDiv);

    let divIndex = document.createElement('div');
    divIndex.textContent = 'index: ' + i;
    newDiv.append(divIndex);
    
    let divKind = document.createElement('div');
    let kind = fruits[i].kind;
    divKind.textContent = 'kind: ' + kind;
    newDiv.append(divKind);

    let divColor = document.createElement('div');
    let color = fruits[i].color;
      if (color === "фиолетовый") {
      newLi.className = 'fruit__item fruit_violet';
    } else if (color === "зеленый") {
      newLi.className = 'fruit__item fruit_green';
    } else if (color === "розово-красный") {
      newLi.className = 'fruit__item fruit_carmazin';
    } else if (color === "желтый") {
      newLi.className = 'fruit__item fruit_yellow';
    } else if (color === "светло-коричневый") {
      newLi.className = 'fruit__item fruit_lightbrown';
    } else if (color === 'коричневый') {
      newLi.className = 'fruit__item fruit_brown';
    } else if (color === 'розовый') {
      newLi.className = 'fruit__item fruit_pink';
    } else if (color === 'синий') {
      newLi.className = 'fruit__item fruit_blue';
    } else {
      newLi.style.backgroundColor = fruits[i].color;
    }
    divColor.textContent = 'color: ' + color;
    newDiv.append(divColor);

    let divWeight = document.createElement('div');
    let weight = fruits[i].weight;
    divWeight.textContent = 'weight (кг): ' + weight;
    newDiv.append(divWeight);
  
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
  }
};

// первая отрисовка карточек
display();


/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    for (i in fruits) {
      var count = Object.keys(fruits).length;
      let random = getRandomInt(0,(count-1));
      result.unshift(fruits[random]);
      var deletItem = fruits.splice(random, 1);
    }
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits.filter((item) => {
    for (i in fruits) {
      if (fruits[i].weight < minweightInput.value) {
        console.log(fruits[i].weight, minweightInput.value);
        var deletItem = fruits.splice(i, 1);
      } else if (maxweightInput.value == 0){
        continue; // на случай если верхний порог фильтрации не задан
      } else if (fruits[i].weight > maxweightInput.value) {
        console.log(fruits[i].weight, maxweightInput.value);
        var deletItem = fruits.splice(i, 1);
      }
    }
    // TODO: допишите функцию
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки




const comparationColor = (a, b) => {
  return a > b ? true : false;
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n-1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n-1-i; j++) { 
           // сравниваем элементы
           // сравнение цветов происходит по индексу расположения в массиве цветов
           if (comparation(colorsFruits.indexOf(arr[j].color), colorsFruits.indexOf(arr[j+1].color))) { 
            // делаем обмен элементов
            let temp = arr[j+1]; 
            arr[j+1] = arr[j]; 
            arr[j] = temp;
          }
       }
      } 
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(List, comparation) {
    if(List.length < 2) {
      return List;
    } else {
      const pivot = List[List.length - 1];
      console.log(pivot);
      const leftList = [];
      const rightList = [];
  
      for (let i = 0; i < List.length - 1; i++) {
        if (comparation(colorsFruits.indexOf(List[i].color), colorsFruits.indexOf(pivot.color))) {
          rightList.push(List[i]);
        }
        else {
          leftList.push(List[i]);
        }
      }
      console.log('правый' , rightList);
      console.log('левый' ,leftList);
      console.log(List); 
      console.log('начальный', fruits);
    return fruits = [...sortAPI['quickSort'](leftList, comparationColor), pivot,...sortAPI['quickSort'](rightList, comparationColor)];
  }
  // TODO: допишите функцию быстрой сортировки
},

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
    sortKindLabel.textContent = sortKind;
  } else {
    sortKind = 'bubbleSort';
    sortKindLabel.textContent = sortKind;
  }
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  let newKind = kindInput.value;
  let newColor = colorInput.value;
  let newWeiht = weightInput.value;

  if (newKind == 0) {
    alert('введите название в поле Kind');
  } else if (newColor == 0) {
    alert('Введите цвет в поле Color в формате rgb или уже существующие на экране');
  } else if (newWeiht == 0){
    alert('Введите вес в поле Weiht');
  } else {
    fruits.push({"kind": newKind, "color": newColor,  "weight":newWeiht});
  }
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
