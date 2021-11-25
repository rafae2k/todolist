const input = document.getElementById('texto-tarefa');
const addTaskBtn = document.getElementById('criar-tarefa');
const list = document.getElementById('lista-tarefas');
const cleanAll = document.getElementById('apaga-tudo');
const cleanFinalized = document.getElementById('remover-finalizados');
const saveBtn = document.getElementById('salvar-tarefas');
const moveUp = document.getElementById('mover-cima');
const moveDown = document.getElementById('mover-baixo');
// const selected = document.getElementsByClassName('selected');
const removeSelectedBtn = document.getElementById('remover-selecionado');
let listItem;

// Rebuild the savedList from local storage to HTML
function printSavedList() {
  const getHtml = JSON.parse(localStorage.getItem('savedList'));
  list.innerHTML = getHtml;
  return list;
}
printSavedList();

// Create the tasks
addTaskBtn.addEventListener('click', () => {
  //   console.log(input.value);
  //   console.log('clicou');
  listItem = document.createElement('li');
  listItem.classList.add('item');
  listItem.textContent = input.value;
  input.value = '';
  list.appendChild(listItem);
});

// Add a gray background to the element selected
list.addEventListener('click', (e) => {
  const allItens = document.querySelectorAll('.item');
  console.log(allItens.classList);

  for (let index = 0; index < allItens.length; index += 1) {
    // allItens[index].style.backgroundColor = 'white';
    allItens[index].classList.remove('selected');
  }
  // e.target.style.backgroundColor = 'rgb(128, 128, 128)';
  e.target.classList.add('selected');
});

// Double-click add a line-through text decoration to the selection
list.addEventListener('dblclick', (e) => {
  e.target.classList.toggle('completed');
});

// Delete all tasks
function deleteAllTasks() {
  list.innerHTML = '';
}
cleanAll.addEventListener('click', deleteAllTasks);

// function cleanCompleted() {
//   const completed = list.getElementsByClassName('completed');
//   console.log(completed);
//   for (let index = 0; index < completed.length; index += 1) {
//     completed[index].remove();
//   }
// }

// Clean all tasks that have the "selected" class name
function removeSelected() {
  const itemDaLista = document.querySelectorAll('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    if (itemDaLista[index].classList.contains('selected')) {
      itemDaLista[index].remove();
    }
  }
}
removeSelectedBtn.addEventListener('click', removeSelected);

// Clean all tasks that have the "completed" class name
function cleanCompleted() {
  const itemDaLista = document.querySelectorAll('li');
  for (let index = 0; index < itemDaLista.length; index += 1) {
    if (itemDaLista[index].classList.contains('completed')) {
      itemDaLista[index].remove();
    }
  }
}
cleanFinalized.addEventListener('click', cleanCompleted);

// Add the feature to save the list on local storage
function saveList() {
  //   console.log(typeof list);
  const savedString = JSON.stringify(list.innerHTML);
  localStorage.setItem('savedList', savedString);
  // const savedString = JSON.stringify(allItens[0], ['className', 'innerHTML']);
  // localStorage.setItem('item1', savedString);
  // console.log(typeof localStorage.getItem('item1'));
}

// Add move up feature
function moveTaskUp() {
  const selected = document.querySelector('.selected');
  if (selected !== null && selected.nextSibling) {
    selected.parentNode.insertBefore(selected.nextSibling, selected);
  }
}
moveDown.addEventListener('click', moveTaskUp);

// Add move down feature
function moveTaskDown() {
  const selected = document.querySelector('.selected');
  if (selected !== null && selected.previousSibling) {
    selected.parentNode.insertBefore(selected, selected.previousSibling);
  }
}
moveUp.addEventListener('click', moveTaskDown);

// Local storage save list feature
saveBtn.addEventListener('click', saveList);
