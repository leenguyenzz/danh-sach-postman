//main.js
var link = 'http://localhost:3000/courses'
var html = []
var listUsers = document.getElementById('users')

function start() {
  getUsers()
  handleUsers()
}

start()

function getUsers() {
  fetch(link)
    .then(function (response) {
      return response.json()
    })
    .then(renderUsers)
}

function renderUsers(users) {
  html = users.map(function (user) {
    return `
        <li class='listItem-${user.id}'>
        <p>${user.name}</p>
        <p>${user.age} Years Old</p>
        <button onclick='btnDelete(${user.id})'>Delete</button>
        <button onclick='btnRename(${user.id})'>Rename</button>
        </li>
        `
  })
  listUsers.innerHTML = html.join('')
}

function addUser(user) {
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }
  fetch(link, options)
    .then(function (response) {
      return response.json()
    })
    .then(function () {
      getUsers()
    })
}

function handleUsers() {
  var btnAdd = document.querySelector('#add')
  btnAdd.onclick = function () {
    var name = document.querySelector('input[name="name"]').value
    var age = Number(document.querySelector('input[name="age"]').value)
    var user = {
      name: name,
      age: age,
    }
    addUser(user)
  }
}

function btnDelete(id) {
  var options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  fetch(link + '/' + id, options)
    .then(function (response) {
      return response.json()
    })
    .then(function () {
      var listItem = document.querySelector('.listItem-' + id)
      listItem.remove()
    })
}

function btnRename(id) {
  var name = document.querySelector('input[name="name"]').value
  var age = Number(document.querySelector('input[name="age"]').value)
  var user = {
    name: name,
    age: age,
  }
  var options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }
  fetch(link + '/' + id, options)
    .then(function (response) {
      return response.json()
    })
    .then(function () {
      getUsers()
    })
  //reset name & age inpute
  document.querySelector('input[name="name"]').value = ''
  document.querySelector('input[name="age"]').value = ''
}
