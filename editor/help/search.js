var sidebar = document.getElementById("sidebar");
var content = document.getElementById("content");
var q = decodeURIComponent(location.search.split("=")[1].replace(/\+/gi, " ")).toLowerCase();
var num;
var question = ["Why is Editor unable to save files?","Why are certain images not able to load?","Why does the page keep freezing? / Why is the Export feature not working?","How to install Editor app","Why is the brush feature not lining up with the cursor when drawing?","Why did all Editor projects get deleted? / How to delete all Editor projects","How to download the Editor soure code"];
var directions = ["Editor uses <a href='https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage' target='_blank'>local storage</a> to save files in your browser. Each browser has a storage limit and it is likely that Editor has reach the allowed storage and cannot save any more. Deleting uneeded files will free up space. Larger files take up significantly more storage space.","Editor may be running slowly but you can still try using the Add Image feature again if it did not work the first time. Importing images from other websites sometimes does not work though if they are not allowed to load.","Editor can freeze when trying to export a project because of the size of the file. Check file details before exporting. If the file is over 0.5MB, exporting may not work. To work around this, first unselect the brush tool and then right-click on the project, allowing options to copy and download the image. If the project has been saved before exporting and there is sufficient storage available, the project will still be saved in your browser. If you need to access the link to the file, Follow the following steps:<br>1. Right-click on the page outside of the image.<br>2. Select 'inspect', then 'Application' from the menu at the top.<br>3. Click on 'Local Storage', opening the first option after expanding its menu.<br>4. Select the row titled 'recentFile' in the 'Key' column. Remember its number in the 'Value' column to the right.<br>5. Click on the row in the 'Key' column with the same title as the number from the previously selected row. The value in this number's row is the link to your last saved file.","To install the Editor app (currently only available in Google Chrome and Brave, not mobile versions), click on the install icon in the right of the web address bar and click 'Install'.","This can occur when the browser window is wide enough that part of the drawing space is below the bottom of the page. Resize the browser window so all of the drawing space is visible without scrolling and the brush should line up with where the cursor is.","If all cookies are cleared on the Editor website, all stored files and progress will be deleted. There is no way to recover lost files, so download any projects to securely save them.","You can download the Editor source code <a href='https://github.com/LB123658/canvas/archive/refs/heads/main.zip'>here</a>."];

function loadResult0(input) {
  if (input.indexOf(q) != -1) {
    var link = document.createElement("p");
    num = question.indexOf(input);
    p.innerHTML = "<a href='#'>" + question[num] + "</a><br><div style='width:50%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;'>" + directions[num] + "</div><br><br>";
    content.innerHTML = "";
    content.appendChild(link);
  } else {
    content.innerHTML = content.innerHTML;
    console.log("0 results");
  }
}


function loadResult1() {
  for (let i = 0; i < question.length ;i++) {
    loadResult0(question[i]);
  }
}
loadResult1();
