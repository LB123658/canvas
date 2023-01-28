// variables
var app = {
  about: "Editor<br>Version 1.0.0<br>" + navigator.appVersion,
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
var exposureValue = 100;
var hueRotateValue = 0;
var canvasFilter = "blur(" + blurValue + "px) contrast(" + contrastValue + "%) brightness(" + exposureValue + "%) hue-rotate(" + hueRotateValue + "deg)";
var projectKey = Math.round(Math.random() * 1000000);
var editNumber = 0;

//onload saving history
localStorage.setItem("fileHistory", projectKey + "; " + localStorage.getItem("fileHistory"));

//functions
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
function addImage() {
var img = document.getElementById("img");
var imageSource = prompt("Enter image URL");
var left = prompt("Place image how many pixels to the right:");
var top = prompt("Place image how many pixels from the top:");
img.src = imageSource;
ctx.drawImage(img, left, top);
}
function addText() {
notify("Text is automatically centered");
var text = prompt("Enter text:");
var textFont0 = prompt("Enter text pixel height:");
var textFont1 = prompt("Enter text font name:");
var textFont = textFont0 + "px " + textFont1;
var textColor = prompt("Enter text color:");
ctx.font = textFont;
ctx.fillStyle = textColor;
ctx.textAlign = "center";
ctx.fillText(text, canvas.width/2, canvas.height/2);
}
function brushSize() {
paintbrushWidth = prompt("Enter brushstroke width in pixels:")
}
function brushColor() {
paintbrushColor = prompt("Enter brushstroke color:")
}
function unselectBrush() {
paintbrushColor = "transparent";
paintbrushWidth = 0;
}
function exportF() {
var fileUrl = canvas.toDataURL();
exportImg.src = fileUrl;
exportLink.value = fileUrl;
exportInfo.innerHTML = "Image details<br>Type: PNG<br>2000 x 1500 pixels (" + (Math.round((fileUrl.length)*3/4))/1000000 + " MB)";
exportDownload.href = fileUrl;
show(shadow);
show(exportPage);
}
function coptFileLink() {
exportLink.value.select();
navigator.clipboard.writeText(exportLink.value);
notify("Link copied");
}
function details() {
var fileUrl = canvas.toDataURL();
notify("Image details<br>Dimensions: 2000 x 1500 pixels<br>File type: PNG<br>File size: " + (Math.round((fileUrl.length)*3/4))/1000000 + " MB");
}
function updateFavicon() {
var fileUrl = canvas.toDataURL();
favicon.href = fileUrl;
}
//setInterval(updateFavicon, 60000);
function preview() {
var fileUrl = canvas.toDataURL();
window.open(fileUrl);
}
function setBlur() {
blurValue = prompt("Enter blur level (0 = no blur):");
ctx.filter = "blur(" + blurValue + "px) contrast(" + contrastValue + "%) brightness(" + exposureValue + "%) hue-rotate(" + hueRotateValue + "deg)";
}
function setContrast() {
contrastValue = prompt("Enter contrast level (100 is default setting):");
ctx.filter = "blur(" + blurValue + "px) contrast(" + contrastValue + "%) brightness(" + exposureValue + "%) hue-rotate(" + hueRotateValue + "deg)";
}
function setExposure() {
exposureValue = prompt("Enter exposure level (100 is default setting, 0 is black):");
ctx.filter = "blur(" + blurValue + "px) contrast(" + contrastValue + "%) brightness(" + exposureValue + "%) hue-rotate(" + hueRotateValue + "deg)";
}
function setHueRotate() {
hueRotateValue = prompt("Enter hue shift number (0 - 360, 0 = no change):");
ctx.filter = "blur(" + blurValue + "px) contrast(" + contrastValue + "%) brightness(" + exposureValue + "%) hue-rotate(" + hueRotateValue + "deg)";
}
function backup() {
editNumber++;
localStorage.setItem("recentFile", projectKey);
var fileUrl = canvas.toDataURL();
localStorage.setItem(projectKey, fileUrl);
console.log(projectKey + "." + editNumber + " saved");
}
function saveFile() {
  try {
    backup();
  }
  catch (e) {
  if (e.code == 22) {
    notify("Unable to save file because Editor storage is full"); //data wasn't successfully saved due to quota exceed so throw an error
  }
  }
}
//css style
function style(element,css,data) {
var style;
if (css.indexOf("-") != -1) {
  var dash = css.indexOf("-");
  var uppercase = css.slice(dash+1, dash+2).toUpperCase();
  style = css.split("-")[0] + uppercase + css.slice(dash+2, css.length)
} else {
  style = css;
}
var script = document.createElement("script");
script.innerHTML = element + ".style." + style + " = \"" + data + "\"";
document.body.appendChild(script);
console.log(script.innerHTML);
}
// example function style("notification","border-radius","0px");

hide(notification);

//CANVAS
var ctx = canvas.getContext("2d");
function fillPage() {
var canvasBackgroundColor = prompt("Enter color to fill page (this will cover up all previous edits):")
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = canvasBackgroundColor;
ctx.fill();
}

//drawimg
let coord = { x: 0, y: 0 };

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);

function reposition(event) {
 if (event.clientX < window.innerWidth - 50 && event.clientX > 200 && event.clientY < (((window.innerWidth - 250) * 0.75) + 50) && event.clientY > 50) {
  coord.x = (((event.clientX - (canvas.offsetLeft + 150)) / (window.innerWidth - 250)) * 2000);
  coord.y = (((event.clientY - canvas.offsetTop) / ((window.innerWidth - 250) * 0.75)) * 1500);
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

//add image from previously edited file
if (window.location.href.indexOf("?file=") != -1) {
  var img = document.getElementById("img");
  var imageSource = localStorage.getItem(window.location.href.split("=")[1]);
  img.src = imageSource;
  ctx.drawImage(img, 0, 0);
}
