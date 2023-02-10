//variables
var notification = document.getElementById("alert");
var shadow = document.getElementById("shadow");
var page = document.getElementById("page");
var storageMessage = page.getElementsByTagName("p")[0];
var storageBar = document.getElementById("storage-bar");
var x;
var number = 0;

//functions
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
function webAppWindow(website) {
  window.open(website, "_blank", "toolbar=no, status=no, titlebar=no, scrollbars=yes,resizable=yes,top=50,left=50,width=1180,height=790");
}
function getTotalStorage() {
  for (i = 0; i < localStorage.length; i++) {
    x = localStorage.getItem(localStorage.key(i)).length;
    number = number + x;
  }
  number = number / 1000000;
  return number + " MB";
}
//basic part
hide(shadow);
hide(notification);
storageMessage.innerHTML = "You have used <span style='background:#9451a8;border-radius:5px;padding:0px 5px 0px 5px;'>" + getTotalStorage() + "</span> out of 5 MB";
storageBar.style.width = (100 * (getTotalStorage().split(" MB")[0] / 5)) + "%";

//load files
function loadFilePreview(fileNum) {
var fileName = localStorage.getItem(fileNum).split("; ")[1].split("\"")[0];
var fileUrl = localStorage.getItem(fileNum).split(",\"")[1].split("\"")[0];
var fileSize = Math.round(((fileUrl.length)*3/4)/1000000) + " MB";
var fileDiv = document.createElement("div");
fileDiv.classList.add("file");
fileDiv.innerHTML = "<img src='" + fileUrl + "'> <p>" + fileName + ".png • " + fileSize;
page.appendChild(fileDiv);
}

//loadFilePreview(fileLog[i]);
