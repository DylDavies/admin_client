/*jshint esversion: 8*/
const url = `http://${require("../../assets/json/storage.json").url}`;

// Total Users
var turequest = new XMLHttpRequest();

turequest.open('GET', `${url}/api/v1/get/users/total`, true);
turequest.onload = function() {
  // Begin accessing JSON data here
  var tudata = JSON.parse(this.response);

  if (turequest.status >= 200 && turequest.status < 400) {
    let tup = document.getElementById('tu');
    tup.textContent = `${tudata.users}`;
  } else {
    console.log('error');
  }
};

turequest.send();

// Total Bots
var brequest = new XMLHttpRequest();

brequest.open('GET', `${url}/api/v1/get/bots/total`, true);
brequest.onload = function() {
  // Begin accessing JSON data here
  var bdata = JSON.parse(this.response);

  if (brequest.status >= 200 && brequest.status < 400) {
    let bup = document.getElementById('b');
    bup.textContent = `${bdata.bots}`;
  } else {
    console.log('error');
  }
};

brequest.send();

// Total Staff
var srequest = new XMLHttpRequest();

srequest.open('GET', `${url}/api/v1/get/staff/total`, true);
srequest.onload = function() {
  // Begin accessing JSON data here
  var sdata = JSON.parse(this.response);

  if (srequest.status >= 200 && srequest.status < 400) {
    let sup = document.getElementById('s');
    sup.textContent = `${sdata.staff}`;
  } else {
    console.log('error');
  }
};

srequest.send();

// Owner Names
var orequest = new XMLHttpRequest();

orequest.open('GET', `${url}/api/v1/get/staff/owners`, true);
orequest.onload = function() {
  // Begin accessing JSON data here
  var odata = JSON.parse(this.response);

  if (orequest.status >= 200 && orequest.status < 400) {
    let oup = document.getElementById('o');
    oup.textContent = `${odata.names}`;
  } else {
    console.log('error');
  }
};

orequest.send();

// Admin Names
var arequest = new XMLHttpRequest();

arequest.open('GET', `${url}/api/v1/get/staff/admins`, true);
arequest.onload = function() {
  // Begin accessing JSON data here
  var adata = JSON.parse(this.response);

  if (arequest.status >= 200 && arequest.status < 400) {
    let aup = document.getElementById('a');
    if (adata.names[0]) {
        aup.textContent = `${adata.names}`;
    } else {
      aup.textContent = `None`;
    }
  } else {
    console.log('error');
  }
};

arequest.send();

// Mod Names
var mrequest = new XMLHttpRequest();

mrequest.open('GET', `${url}/api/v1/get/staff/mods`, true);
mrequest.onload = function() {
  // Begin accessing JSON data here
  var mdata = JSON.parse(this.response);

  if (mrequest.status >= 200 && mrequest.status < 400) {
    let mup = document.getElementById('m');
    if (mdata.names[0]) {
        mup.textContent = `${mdata.names}`;
    } else {
      mup.textContent = `None`;
    }
  } else {
    console.log('error');
  }
};

mrequest.send();

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

// Reload button
const electron = require('electron');
const {ipcRenderer} = electron;

let reload = (e) => {
  e.preventDefault();
  ipcRenderer.send('reloadpage', 'win');
};

let manTotU = (e) => {
  e.preventDefault();
  ipcRenderer.send('openWin', "manTotalUsers");
};

let manTotB = (e) => {
  e.preventDefault();
  ipcRenderer.send('openWin', "manTotalBots");
};

let manMods = (e) => {
  e.preventDefault();
  ipcRenderer.send('openWin', "manMods");
};

let manBans = (e) => {
  e.preventDefault();
  ipcRenderer.send('openWin', "manBans");
};


document.getElementById('rbut').addEventListener('click', reload);

document.getElementById('manTotalUsers').addEventListener('click', manTotU);

document.getElementById('manTotalBots').addEventListener('click', manTotB);

document.getElementById('manMods').addEventListener('click', manMods);

document.getElementById('manBans').addEventListener('click', manBans);
