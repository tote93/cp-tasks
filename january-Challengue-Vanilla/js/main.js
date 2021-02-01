let form = document.getElementsByClassName("submit")[0];
let counterTodos = 0;
let todoStorage = [];

const generateNewTask = (index) => {
  const inputValue = document.querySelector(`#nameTask_${index}`);
  if (inputValue.value !== "") {
    createTask(index, inputValue.value);
    inputValue.value = "";
    document.querySelector(".form__image").style.display = "none";
  }
};

function createTask(index, task) {
  const todo = {
    key: counterTodos,
    checked: false,
    cardTitle: task,
  };
  document.querySelector(`.todoList_${index}`).innerHTML += generateTemplate(
    todo.key,
    todo
  );
  addToStorage(index, todo);
  counterTodos++;
}

const addToStorage = (index, todo) => {
  todoStorage[index].items.push(todo);
  exportDataToStorage(todoStorage);
};

// Load the LocalStorage
window.addEventListener("load", function () {
  const card = JSON.parse(localStorage.getItem("cards"));
  if (card) {
    todoStorage = card;
    todoStorage.map((item) => {
      generateCardTemplate(item);
    });
    counterTodos = todoStorage.length;
  }
});

const generateTemplate = (parentId, data) => {
  const check = data.checked ? true : false;
  return `<li class="todo card_${data.key}"><label class="todo__label" for="${
    data.cardTitle
  }" ><input class="todo__input checkbox_${data.key}" ${
    check ? "checked" : ""
  } type="checkbox" 
    onclick='exportData(${parentId},${data.key})'
  /><span class="check"></span ><input maxlength="10" type="text" class="todo__edit ${
    data.checked && "checked"
  } todo_${data.key}" value="${
    data.cardTitle
  }"/></label><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="save" onclick='exportData(${parentId}, ${
    data.key
  })'class="todoIcon todoIcon--confirm svg-inline--fa fa-save fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"></path></svg><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" onclick="deleteTask(${
    data.key
  }, ${parentId})" class="todoIcon todoIcon--delete svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg></li>`;
};

const exportData = (parentId, index) => {
  const checkbox = document.querySelector(`.checkbox_${index}`);
  const todoInput = document.querySelector(`.todo_${index}`);
  todoStorage[parentId].items = todoStorage[parentId].items.map((todo) => {
    if (todo.key === index) {
      return {
        key: index,
        cardTitle: todoInput.value,
        checked: checkbox.checked,
      };
    } else {
      return todo;
    }
  });
  exportDataToStorage(todoStorage);
};

const deleteAllTask = (index) => {
  todoStorage[index].items = [];
  document.querySelector(`.todoList_${index}`).innerHTML = "";
  localStorage.setItem("cards", JSON.stringify(todoStorage));
};

const deleteTask = (index, parentId) => {
  todoStorage[parentId].items = todoStorage[parentId].items.filter(
    (item) => item.key !== index
  );

  const deleteElement = document.querySelector(`.card_${index}`);
  console.log(deleteElement);
  document.querySelector(".app").removeChild(deleteElement);
  exportDataToStorage(todoStorage);
};

const exportDataToStorage = (data) => {
  localStorage.setItem("cards", JSON.stringify(data));
};

const createNewList = () => {
  const input = document.getElementById("nameNewList");
  if (input.value === "") {
    alert("Please insert a name for your list");
  } else {
    const newList = {
      cardTitle: input.value,
      items: [],
      key: todoStorage.length,
    };
    let newTodoStorage = [...todoStorage, newList];
    todoStorage = newTodoStorage;
    exportDataToStorage(newTodoStorage);
    generateCardTemplate(newList);
    cancelModal();
    input.value = "";
  }
};
const deleteCard = (index) => {
  todoStorage = todoStorage.filter((card) => card.key !== index);
  exportDataToStorage(todoStorage);
  const deleteElement = document.querySelector(`.card_${index}`);
  document.querySelector(".app").removeChild(deleteElement);
};

const generateCardTemplate = (item) => {
  document.querySelector(".app").innerHTML += `<div class="card card_${
    item.key
  }"><div class="card__image"><svg class="closeBtn" onclick="deleteCard(${
    item.key
  })" aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg> <div class="card__title"> <h3>${
    item.cardTitle
  }</h3> </div> </div> <div class="card__form"> <div class="submit form__input"> <input autocomplete="off" autofocus id="nameTask_${
    item.key
  }"  oninput="displayFormIcons(${
    item.key
  })" class="maxlength="10" placeholder="Type your task..." /> <button class="form__submit" onclick="generateNewTask(${
    item.key
  })"> <img class="form__image form__image_${
    item.key
  }" src="../css/plus-solid.svg" alt="" /> </button> </div> <ul class="todoList todoList_${
    item.key
  }">${item.items.map((todo) => {
    return generateTemplate(item.key, todo);
  })}</ul><button class="card__deleteAll" onclick="deleteAllTask(${
    item.key
  })"> Delete All </button> </div> </div>`;
};

const displayFormIcons = (index) => {
  const inputValue = document.querySelector(`#nameTask_${index}`);
  const addBtn = document.querySelector(`.form__image_${index}`);
  if (inputValue.value !== "") {
    addBtn.style.display = "block";
  } else {
    addBtn.style.display = "none";
  }
  inputValue.addEventListener("keyup", function (e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      e.preventDefault();
      generateNewTask(index);
    }
  });
};

/* MODAL */

var modal = document.getElementById("myModal");
const openModal = () => {
  modal.style.display = "block";
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const cancelModal = () => {
  modal.style.display = "none";
};

const deleteAllLists = () => {
  todoStorage = [];
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    document.querySelector(".app").removeChild(card);
  });
  localStorage.removeItem("cards");
};
