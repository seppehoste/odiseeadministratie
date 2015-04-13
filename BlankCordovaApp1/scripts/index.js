// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

function onOffline() {
    alert("geen internetconnectie");
}
function onOnline() {
    alert("je bent online");
}

function onDeviceReady() {
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
}