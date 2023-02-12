var buttonInstall = document.getElementById("install-button");
var h2 = document.getElementsByTagName("h2")[0];
var type;

if (navigator.platform.indexOf("Mac") != -1) {
type = "MacOS";
} else if (navigator.platform.indexOf("Win") != -1) {
type = "Windows";
} else if (navigator.userAgent.indexOf("CrOS") > -1) {
type = "ChromeOS";
} else {
type = navigator.platform;
}
h2.innerHTML = "Install Editor for " + type;

const body = document.body;
if (window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.style.background = "rgb(29,31,34)";
  h2.style.color = "white";
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  buttonInstall.style.display = 'block';
});
buttonInstall.addEventListener('click', (e) => {
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});
