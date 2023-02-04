var sidebar = document.getElementById("sidebar");
var content = document.getElementById("content");

function loadLink(num) {
var a = document.createElement("p");
a.innerHTML = "<a href='#'>" + question[num] + "</a><br>";
a.onclick = function() {loadContent(num);};
sidebar.appendChild(a);
}
function loadContent(q) {
var htmlCode = "<h2>" + question[q] + "</h2><br><p>" + directions[q] + "</p><br><br><p>Was this helpful?</p><button>Yes</button><button>No</button>";
content.innerHTML = htmlCode;
}

for (let i = 0; i < question.length ;i++) {
  loadLink(i);
}
