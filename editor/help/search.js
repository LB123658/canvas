var sidebar = document.getElementById("sidebar");
var content = document.getElementById("content");
var q = decodeURIComponent(location.search.split("=")[1].replace(/\+/gi, " ")).toLowerCase();
var none = `<h2>No results matched your search</h2><p>Return to the Editor Help homepage for all topics.</p><a href="index.html" target="_blank">Help homepage</a><br><a href="../index.html" target="_blank">Open Editor <span class="material-icons" style="font-size: 14px">launch</span></a>`;

function loadResults(x) {
  if (x.toLowerCase().indexOf(q.toLowerCase()) != -1) {
    var number = directions.indexOf(x);
    var link = document.createElement("p");
    link.innerHTML = "<a href='index.html?topic=" + number + "'>" + question[number] + "</a><br><div style='width:50%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:black; text-decoration:none;'>" + directions[number] + "</div><br>";
    content.appendChild(link);
  } else {
    content.innerHTML = none;
  }
}

for (let i = 0; i < directions.length ;i++) {
    loadResults(directions[i]);
}
