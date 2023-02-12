var page = document.getElementById("page");
var h2 = document.getElementsByTagName("h2")[0];
var type;
//for custom pages
var macH2;
var css = document.getElementsByTagName("link")[2];
var supportedOption;
var supportedFunction;
var description;

//automatoc light/dark mode
const body = document.body;
if (window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.style.background = "rgb(29,31,34)";
  h2.style.color = "white";
  macH2 = "white";
}

//get device type and show custom page
if (navigator.userAgent.includes("Chrome")) {
  supportedOption = "GET";
  supportedFunction = "install()";
  description = "app";
} else if (navigator.userAgent.includes("Safari") && navigator.userAgent.includes("Chrome") == false){
  supportedOption = "OPEN";
  supportedFunction = "window.open('index.html', '_self')";
  description = "(app not supported on Safari)";
} else if (navigator.userAgent.includes("Firefox")){
  supportedOption = "OPEN";
  supportedFunction = "window.open('index.html', '_self')";
  description = "(app not supported on Firefox)";
} else {
  supportedOption = "OPEN";
  supportedFunction = "window.open('index.html', '_self')";
  description = "(app not supported on this browser)";
}

var mac = `
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  * {
    cursor: default;
    font-family: 'Montserrat', sans-serif;
    user-select: none;
    -webkit-user-select: none;
  }
  body {
  overflow: hidden;
  }
  #logo {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 100px;
    height: 100px;
  }
  h2 {
    color: ${macH2};
    margin-top: 4px;
    font-weight: bold;
    line-height: 0.5;
  }
  p {
    color: grey;
  }
  button {
    height: 30px;
    padding: 5px 20px 5px 20px;
    border-radius: 15px;
    color: white;
    background: rgb(47, 124, 246);
    border: none;
    font-size: 17px;
    font-weight: bold;
    cursor: default;
  }
  button:hover {
  	background: rgb(47, 124, 246);
  }
  #app-name {
  	position: absolute;
    top: 30px;
    left: 150px;
    text-align: left;
    height: 130px;
    overflow: hidden;
  }
  hr {
    height: 1px;
    border: none;
    background: grey;
    width: calc(100% - 60px);
  }
  #hr-1 {
    position: absolute;
    top: 160px;
    left: 30px;
  }
  #hr-2 {
    position: absolute;
    top: 270px;
    left: 30px;
  }
  #bar {
    position: absolute;
    top: 175px;
    left: 30px;
    height: 100px;
    width: calc(100% - 60px);
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .square {
    width: 16.6%;
    height: 100px;
    text-align: center;
    background: transparent;
    border: 0.1px solid rgb(0, 0, 0, 0.5);
    border-top: none;
    border-bottom: none;
  }
  .one {
    color: grey;
    font-weight: bold;
    font-size: 11px;
    opacity: 0.7;
  }
  .two {
    color: rgb(153, 154, 155);
    font-size: 20px;
  }
  .three {
    color: rgb(153, 154, 155);
    font-size: 10px;
  }
  </style>
  <img id="logo" src="images/favicon.png">
  <div id="app-name">
  <h2>Editor</h2>
    <p>A free graphics editor ${description}</p>
    <button id="installBtn" onclick="${supportedFunction}">${supportedOption}</button>
  </div>
  <hr id="hr-1">
  <div id="bar">
    <div class="square">
      <p class="one">SUPPORTED ON</p>
      <span class="two material-icons">done</span>
      <p class="three">Google Chrome</p>
    </div>
    <div class="square">
      <p class="one">0 RATINGS</p>
      <span class="two">0</span>
      <p class="three">★★★★★</p>
    </div>
    <div class="square">
      <p class="one">CATEGORY</p>
      <span class="two material-icons">photo_camera</span>
      <p class="three">Photo &amp; Art</p>
    </div>
    <div class="square">
      <p class="one">AGE</p>
      <span class="two">12+</span>
      <p class="three">Years Old</p>
    </div>
    <div class="square">
      <p class="one">LANGUAGE</p>
      <span class="two">EN</span>
      <p class="three">English</p>
    </div>
    <div class="square">
      <p class="one">DEVELOPER</p>
      <span class="two material-icons">account_box</span>
      <p class="three">lb123658.github.io</p>
    </div>
  </div>
  <hr id="hr-2">
`;
function loadPage(system) {
  css.remove();
	page.innerHTML = system;
}

if (navigator.platform.indexOf("Mac") != -1) {
type = "MacOS";
loadPage(mac);
} else if (navigator.platform.indexOf("Win") != -1) {
type = "Windows";
} else if (navigator.userAgent.indexOf("CrOS") > -1) {
type = "ChromeOS";
} else {
type = navigator.platform;
}
h2.innerHTML = "Install Editor for " + type;


    var beforeInstallPrompt = null;

    window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);

    function eventHandler(event) {
      beforeInstallPrompt = event;
      document.getElementById("installBtn").removeAttribute("disabled");
    }

    function errorHandler(event) {
      console.log("error: " + event);
    }

    function install() {
    if (beforeInstallPrompt) beforeInstallPrompt.prompt();
    }
    
//redirect page when installed    
function detectIfInstalled() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    document.getElementById("installBtn").innerHTML = "Installing...";
    setTimeout(function(){window.open("index.html", "_self");},2000);
  }
}
setInterval(detectIfInstalled, 500);
