/*jshint esversion:8*/
const url = `http://${require("../../assets/json/storage.json").url}`;

// Heading info
var headreq = new XMLHttpRequest();

headreq.open(`GET`, `${url}/api/v1/get/serverinfo`);
headreq.onload = function() {
  // Begin accessing JSON data here
  var headdata = JSON.parse(this.response);

  if (headreq.status >= 200 && headreq.status < 400) {
    let sname = document.getElementById('name');
    let sid = document.getElementById('id');

    sname.textContent = headdata.name;
    sid.textContent = headdata.id;
  } else {
    console.log('error');
  }
};

headreq.send();

var turequest = new XMLHttpRequest();

turequest.open('GET', `${url}/api/v1/get/staff/mods/all`, true);
turequest.onload = function() {
  var tudata = JSON.parse(this.response);

  tudata.mods = JSON.parse(tudata.mods);

  if (turequest.status === 200) {
    let table = document.getElementById('usertable');

    let ids = [];

    for (i = 0; i < tudata.length; i++) {

      let row = table.insertRow(1);
      let demote = row.insertCell(0);
      let username = row.insertCell(0);

      var user = tudata.mods[i];

      row.setAttribute('id', `${user.id}`);
      demote.innerHTML = `<button type="button" class="btn btn-warning" id="demote-${user.id}">Demote</button>`;
      username.innerHTML = user.username;

      ids.push(user.id);
    }

    if (!ids[0]) {
      let row = table.insertRow(1);
      let demote = row.insertCell(0);
      let username = row.insertCell(0);

      demote.innderHTML = `<button type="button" class="btn btn-warning" disabled>Demote</button>`;
      username.innerHTML = "None";
    }

    ids = ids.reverse();

    ids.forEach(id => {
      document.getElementById(`demote-${id}`).addEventListener('click', (e) => {
        e.preventDefault();

        demoteFunc(id);
      });
    });
  } else {
    console.log('error');
  }
};

turequest.send();

let demoteFunc = (id) => {
  let banreq = new XMLHttpRequest();
  banreq.open(`POST`, `${url}/api/v1/staff/mods/demote/${id}`, true);
  banreq.onload = function(){
    let bandata = JSON.parse(this.response);

    if (banreq.status >= 200 && banreq.status < 400 && bandata.error) {
      let ediv = document.getElementById(`error-div`);
      let epara = document.createElement("p");
      let node = document.createTextNode(bandata.error);

      epara.appendChild(node);
      ediv.classList.add("alert");
      ediv.classList.add("alert-danger");
      ediv.appendChild(epara);

      setTimeout(function(){
        ediv.classList.remove("alert");
        ediv.classList.remove("alert-danger");
        ediv.removeChild(epara);
      }, 5000);

    } else if (banreq.status >= 200 && banreq.status < 400 && bandata.success === true) {
      document.getElementById(`${id}`).remove();

      let sdiv = document.getElementById(`success-div`);
      let spara = document.createElement("p");
      let node = document.createTextNode("User demoted successfully.");

      spara.appendChild(node);
      sdiv.classList.add("alert");
      sdiv.classList.add("alert-success");
      sdiv.appendChild(spara);

      setTimeout(function(){
        sdiv.classList.remove("alert");
        sdiv.classList.remove("alert-success");
        sdiv.removeChild(spara);
      }, 5000);
    }
  };

  banreq.send();
};

const electron = require('electron');
const {ipcRenderer} = electron;

let reload = (e) => {
  e.preventDefault();
  ipcRenderer.send('reloadpage', 'manMods');
};

document.getElementById('rbut').addEventListener('click', reload);
