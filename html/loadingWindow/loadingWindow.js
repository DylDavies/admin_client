/*jshint esversion: 8*/

const url = require("../../assets/json/storage.json").url;

const online = navigator.onLine ? 'online' : 'offline';
let checkAPI = false;

function checkConnections () {
  document.getElementById('intit').textContent = "Internet Connection Checked";
  if (online === 'online') {
    document.getElementById('int').textContent = "Connected to the Internet";
    document.getElementById('intdiv').classList.remove("bg-dark");
    document.getElementById('intdiv').classList.remove("text-white");
    document.getElementById('intdiv').classList.add("alert");
    document.getElementById('intdiv').classList.add("alert-success");
    checkAPI = true;
  } else {
    document.getElementById('int').textContent = "Internet Connection Failed, please connect to the internet then hit retry.";
    document.getElementById('intdiv').classList.remove("bg-dark");
    document.getElementById('intdiv').classList.remove("text-white");
    document.getElementById('intdiv').classList.add("alert");
    document.getElementById('intdiv').classList.add("alert-danger");
    document.getElementById('apidiv').removeChild(document.getElementById('apicheck'));
    document.getElementById('rdiv').hidden = false;
  }

  if (checkAPI === true) {
    checkServer(url, 2000).then(d => {
      document.getElementById('apiti').textContent = "API Connection Checked";
      if (d === 'Server Exists') {
        document.getElementById('apistat').textContent = "Connected to the API";
        document.getElementById('apicheck').classList.remove("bg-dark");
        document.getElementById('apicheck').classList.remove("text-white");
        document.getElementById('apicheck').classList.add("alert");
        document.getElementById('apicheck').classList.add("alert-success");
        apiOnline();
      } else {
        document.getElementById('apistat').textContent = "API Connection Failed, please retry later.";
        document.getElementById('apicheck').classList.remove("bg-dark");
        document.getElementById('apicheck').classList.remove("text-white");
        document.getElementById('apicheck').classList.add("alert");
        document.getElementById('apicheck').classList.add("alert-danger");

        setTimeout(apiOffline, 10000);
      }
    });
  }
}

setTimeout(checkConnections, 2000);

const electron = require('electron');
const {ipcRenderer} = electron;

let reload = (e) => {
  e.preventDefault();
  ipcRenderer.send('reloadpage', "onlineWin");
};

let apiOnline = () => {
  ipcRenderer.send('onlineWin:load-successfull', true);
};

let apiOffline = () => {
  ipcRenderer.send('onlineWin:load-failed', true);
};

async function checkServer(url, timeout) {
  const controller = new AbortController();
  const signal = controller.signal;
  const options = { mode: 'no-cors', signal };
  let out;
  await fetch(`http://${url}/online`, options)
    .then(setTimeout(() => { controller.abort() }, timeout))
    .then(response => out = "Server Exists")
    .catch(error => out = "Server Offline");

  return out;
}

document.getElementById('rbut').addEventListener('click', reload);
