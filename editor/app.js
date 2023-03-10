// variables
var app = {
  about: "Editor<br>Version 2.0.0<br>" + navigator.appVersion,
  link: window.location.href
}
var notification = document.getElementById("alert");
var home = document.getElementById("home");
var canvas = document.getElementById("canvas");
var img = document.getElementById("img");
var paintbrushWidth = 0;
var paintbrushColor = "transparent";
var exportPage = document.getElementById("export-page");
var exportImg = document.getElementById("export-img");
var exportInfo = document.getElementById("export-data");
var exportLink = document.getElementById("export-link");
var exportDownload = document.getElementById("export-download");
var shadow = document.getElementById("shadow");
var fileUrl;
var favicon = document.getElementById("favicon");
var blurValue = 0;
var contrastValue = 100;
var brightnessValue = 100;
var invertValue = 0;
var canvasFilter = "blur(" + blurValue + "px) contrast(" + contrastValue + "%) brightness(" + brightnessValue + "%) invert(" + invertValue + "deg)";
var ctx = canvas.getContext("2d");
var ratio = canvas.height / canvas.width;
var inputHeight;
var inputWidth;
var dimensionPage = document.getElementById("dimension-page");
var brushInUse = 0;
var selectBrushButton = document.getElementById("select-brush-button");
//hover boxes
var fillPageHover = document.getElementById("fill-page-hover");
var addImageHover = document.getElementById("add-image-hover");
var addTextHover = document.getElementById("add-text-hover");
var setBrushHover = document.getElementById("set-brush-hover");
var setFilterHover = document.getElementById("set-filter-hover");
//saving
var projectKey;
var fileSource;

//basic functions 
function show(element) {
element.style.visibility = "visible";
}
function hide(element) {
element.style.visibility = "hidden";
}
function notify(message) {
document.getElementById("alert-message").innerHTML = message;
show(notification);
}
function display(element,fromTop) {
  for (let i = 0; i < document.getElementsByClassName("hover-box").length; i++) {
    document.getElementsByClassName("hover-box")[i].style.visibility = "hidden";
  }
show(element);
element.style.top = fromTop + "px";
}

//FUNCTIONS TO SET UP PAGE CORRECTLY
//onload saving history
if (window.location.href.indexOf("?file=") != -1) {
  fileSource = {
    w: localStorage.getItem(window.location.href.split("=")[1]).split("\"")[1].split("x")[0],
    h: localStorage.getItem(window.location.href.split("=")[1]).split("x")[1].split(";")[0],
    title: localStorage.getItem(window.location.href.split("=")[1]).split("; ")[1].split("\"")[0],
    link: localStorage.getItem(window.location.href.split("=")[1]).split(",\"")[1].split("\"")[0]
  }
  projectKey = window.location.href.split("=")[1];
  canvas.width = fileSource.w;
  canvas.height = fileSource.h;
  img.src = fileSource.link;
  ctx.drawImage(img, 0, 0);
  hide(dimensionPage);
  hide(shadow);
  if (localStorage.getItem("fileLog").indexOf(projectKey) < 0) {
    localStorage.setItem("fileLog", "\"" + projectKey + "\"," + localStorage.getItem("fileLog"));
  }
} else {
  projectKey = Math.round(Math.random() * 1000000);
  localStorage.setItem("fileLog", "\"" + projectKey + "\"," + localStorage.getItem("fileLog"));
  var fileUrl = canvas.toDataURL();
  localStorage.setItem(projectKey, "\"" + canvas.width + "x" + canvas.height + "; " + projectKey + "\",\"" + fileUrl + "\"");
}
//save to local storage
function backup() {
var fileUrl = canvas.toDataURL();
localStorage.setItem(projectKey, "\"" + canvas.width + "x" + canvas.height + "; " + projectKey + "\",\"" + fileUrl + "\"");
console.log(projectKey + " saved");
}
function saveFile() {
  try {
    backup();
    notify("File successfully saved");
  }
  catch (e) {
  if (e.code == 22) {
    notify("Unable to save file because Editor storage is full"); //data wasn't successfully saved due to quota exceed so throw an error
  }
  }
}

//focus width input
document.getElementById("page-width-input").focus();

//set correct height to width ratio
function setCanvasDimensions() {
inputHeight = document.getElementById("page-height-input").value;
inputWidth = document.getElementById("page-width-input").value;
canvas.height = inputHeight;
canvas.width = inputWidth;
ratio = canvas.height / canvas.width;
hide(shadow);
hide(dimensionPage);
}
//hide notification box
hide(notification);

//not allow brush select before brush values are set
selectBrushButton.classList.add("off");

// EDITOR BUTTON FUNCTIONS
//functions
function webAppWindow(website) {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    window.open(website, "_blank", "toolbar=no, status=no, titlebar=no, scrollbars=yes,resizable=yes,top=50,left=50,width=1180,height=790");
  } else {
    var a = document.createElement("a");
    a.href = website;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
function fillPage() {
var canvasBackgroundColor = fillPageHover.getElementsByTagName("input")[0].value;
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = canvasBackgroundColor;
ctx.fill();
}
function addImage() {
var imageSource = addImageHover.getElementsByTagName("input")[0].value;
img.src = imageSource;
ctx.drawImage(img, 0, 0);
}
function addText() {
var text = addTextHover.getElementsByTagName("input")[0].value;
//text height
var textFont0 = addTextHover.getElementsByTagName("input")[1].value;
//font name
var textFont1 = addTextHover.getElementsByTagName("input")[2].value;
var textFont = textFont0 + "px " + textFont1;
var textColor = addTextHover.getElementsByTagName("input")[3].value
ctx.font = textFont;
ctx.fillStyle = textColor;
ctx.textAlign = "center";
ctx.fillText(text, canvas.width/2, (canvas.height + (0.5 * textFont0))/2);
}
function setBrush() {
paintbrushWidth = setBrushHover.getElementsByTagName("input")[0].value;
paintbrushColor = setBrushHover.getElementsByTagName("input")[1].value;
hide(setBrushHover);
brushInUse = 1;
selectBrushButton.classList.remove("off");
}
function toggleBrush() {
  if (brushInUse == 1) {
    paintbrushColor = "transparent";
    paintbrushWidth = 0;
    brushInUse = 0;
    selectBrushButton.innerHTML = "Select brush";
  } else {
    paintbrushWidth = setBrushHover.getElementsByTagName("input")[0].value;
    paintbrushColor = setBrushHover.getElementsByTagName("input")[1].value;
    brushInUse = 1;
    selectBrushButton.innerHTML = "Unselect brush";
  }
}
function applyFilters() {
blurValue = setFilterHover.getElementsByTagName("input")[0].value;
contrastValue = setFilterHover.getElementsByTagName("input")[1].value;
brightnessValue = setFilterHover.getElementsByTagName("input")[2].value;
invertValue = setFilterHover.getElementsByTagName("input")[3].value;
ctx.filter = "blur(" + blurValue + "px) contrast(" + contrastValue + "%) brightness(" + brightnessValue + "%) invert(" + invertValue + "%)";
hide(setFilterHover);
}
function exportF() {
var fileUrl = canvas.toDataURL();
exportImg.src = fileUrl;
exportLink.value = fileUrl;
exportInfo.innerHTML = "Image details<br>Type: PNG<br>" + canvas.width + " x " + canvas.height + " pixels (" + (Math.round((fileUrl.length)*3/4))/1000000 + " MB)";
exportDownload.href = fileUrl;
exportPage.style.height = (window.innerHeight * 0.6 * 0.5) + 200 + "px";
exportPage.style.marginTop = -(exportPage.style.height.split("px")[0] / 2) + "px";
show(shadow);
show(exportPage);
}
function copyFileLink() {
var fileUrl = canvas.toDataURL();
navigator.clipboard.writeText(fileUrl);
notify("Link copied");
}
function details() {
var fileUrl = canvas.toDataURL();
notify("Image details<br>Dimensions: " + canvas.width + " x " + canvas.height + " pixels<br>File type: PNG<br>File size: " + (Math.round((fileUrl.length)*3/4))/1000000 + " MB");
}


//DRAWING 
let coord = { x: 0, y: 0 };

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);

//adjust cursor position to pixel on canvas even when resizing page
function reposition(event) {
 if (event.clientX < window.innerWidth - 50 && event.clientX > 200 && event.clientY < (((window.innerWidth - 250) * ratio) + 50) && event.clientY > 50) {
  coord.x = (((event.clientX - (canvas.offsetLeft + 150)) / (window.innerWidth - 250)) * canvas.width);
  coord.y = (((event.clientY - canvas.offsetTop) / ((window.innerWidth - 250) * ratio)) * canvas.height);
  console.log(coord.x + " (" + canvas.offsetLeft + ") (" + (event.clientX - canvas.offsetLeft) + "), " + coord.y);
} else {
}
}
function start(event) {
  document.addEventListener("mousemove", draw);
  reposition(event);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}
function draw(event) {
  ctx.beginPath();
  ctx.lineWidth = paintbrushWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = paintbrushColor;
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}
