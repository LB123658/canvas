var fileLog = localStorage.getItem("fileLog").split(",null")[0].replace(/,\"/gi, "").split("\"");
var fileData;

//get individual file details
function getDetails(projectKey) {
  fileData = new Array(4);
  fileData[0] = localStorage.getItem(projectKey).split("\"")[1].split("x")[0];
  fileData[1] = localStorage.getItem(projectKey).split("x")[1].split(";")[0],
  fileData[2] = localStorage.getItem(projectKey).split("; ")[1].split("\"")[0],
  fileData[3] = localStorage.getItem(projectKey).split(",\"")[1].split("\"")[0];
  
  return fileData;
}
function getAllFiles(input) {
  for(i = 0; i < input.length; i++) {
    getDetails(input[i]);
  }
}
console.log(getAllFiles(fileLog));

//GET TOTAL LOCAL STORAGE USED
var x;
var number = 0;
function getTotalStorage() {
  for (i = 0; i < localStorage.length; i++) {
    x = localStorage.getItem(localStorage.key(i)).length;
    number = number + x;
  }
  number = number / 1000000;
  console.log(number + " MB");
}
getTotalStorage();
