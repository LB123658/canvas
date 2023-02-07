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
