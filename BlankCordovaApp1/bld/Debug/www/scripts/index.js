﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
//(function () {
    //"use strict";

    document.addEventListener("deviceready", onDeviceReady, false);




    function onDeviceReady() {

        document.addEventListener("offline", onOffline, false);

        function onOffline() {
            // Handle the offline event
        }

        document.addEventListener("online", onOnline, false);

        function onOnline() {
            // Handle the online event
        }

    }

  
//} )();