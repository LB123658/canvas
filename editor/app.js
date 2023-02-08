// variables
var app = {
  about: "Editor<br>Version 1.2.0<br>" + navigator.appVersion,
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
var ctx = canvas.getContext("2d");
var ratio = canvas.height / canvas.width;
var inputHeight;
var inputWidth;
var dimensionPage = document.getElementById("dimension-page");
//hover boxes
var fillPageHover = document.getElementById("fill-page-hover");
var addImageHover = document.getElementById("add-image-hover");

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
show(element);
element.style.top = fromTop + "px";
}

//FUNCTIONS TO SET UP PAGE CORRECTLY
//onload saving history
localStorage.setItem("fileHistory", projectKey + "; " + localStorage.getItem("fileHistory"));

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

//add image from previously edited file
if (window.location.href.indexOf("?file=") != -1) {
  var img = document.getElementById("img");
  var recentFileSource = localStorage.getItem(window.location.href.split("=")[1]);
  img.src = recentFileSource;
  ctx.drawImage(img, 0, 0);
}

// EDITOR BUTTON FUNCTIONS
//functions
function webAppWindow(website) {
  window.open(website, "_blank", "toolbar=no, status=no, titlebar=no, scrollbars=yes,resizable=yes,top=50,left=50,width=1180,height=790");
}
function addImage() {
var imageSource = addImageHover.getElementsByTagName("input")[0].value;
img.src = imageSource;
ctx.drawImage(img, 0, 0);
}
function addText() {
notify("Text has been automatically centered");
var text = prompt("Enter text:");
var textFont0 = prompt("Enter text pixel height:");
var textFont1 = prompt("Enter text font name:");
var textFont = textFont0 + "px " + textFont1;
var textColor = prompt("Enter text color:");
ctx.font = textFont;
ctx.fillStyle = textColor;
ctx.textAlign = "center";
ctx.fillText(text, canvas.width/2, (canvas.height + (0.5 * textFont0))/2);
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
    notify("File successfully saved");
  }
  catch (e) {
  if (e.code == 22) {
    notify("Unable to save file because Editor storage is full"); //data wasn't successfully saved due to quota exceed so throw an error
  }
  }
}
function fillPage() {
var canvasBackgroundColor = fillPageHover.getElementsByTagName("input")[0].value;
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = canvasBackgroundColor;
ctx.fill();
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
