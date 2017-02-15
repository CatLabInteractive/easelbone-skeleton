var App = {};

if (typeof(ENV) == 'undefined') {
    var ENV = 'browser';
}

// Some hacks to avoid bugs
var stop = function () {
    alert('stop() instead of this.stop() called. Probably in a tween. Please contact a developer.');
};

if (!window.console) {
    var console = {};
}

if (!console.log) {
    console.log = function () {};
}

// First set the requirejs config
require.config({
    paths: {
        "config": "config",

        // Plugins
        "text": "../vendor/requirejs-plugins/lib/text",
        "json": "../vendor/requirejs-plugins/src/json",

        // Libraries
        "EaselJS": "../vendor/EaselJS/lib/easeljs-NEXT.combined",
        "PreloadJS": "../vendor/PreloadJS/lib/preloadjs-NEXT.combined",
        "SoundJS": "../vendor/SoundJS/lib/soundjs-NEXT.combined",
        "TweenJS": "../vendor/TweenJS/lib/tweenjs-NEXT.combined",
        "backbone": "../vendor/backbone/backbone",
        "backbone.controller": "../vendor/backbone.controller/backbone.controller",
        "underscore": "../vendor/underscore/underscore",
        "jquery": "../vendor/jquery/dist/jquery",
        "requirejs": "../vendor/requirejs/require",
        //"catlabremote": "http://remote.catlab.eu/webremote/vendor/catlabremote/dist/scripts/catlabremote",
        "easelbone": "../vendor/easelbone/dist/scripts/easelbone",
        "easelhacks": "../vendor/easelhacks/dist/scripts/easelhacks",
        "i18n-lite": "../vendor/i18n-lite/dist/scripts/i18n-lite",
        "sprintf": "../vendor/sprintf/dist/sprintf.min",
        "js-cookie": "../vendor/js-cookie/src/js.cookie",
        "airbrake-js": "../vendor/airbrake-js-client/dist/client",
        "cordovaaudioplugin": "../vendor/SoundJS/lib/cordovaaudioplugin-NEXT.combined"
    },
    shim: {
        EaselJS: {
            deps: [],
            exports: "createjs"
        },
        SoundJS: {
            deps: [
                "EaselJS"
            ],
            exports: "createjs"
        },
        cordovaaudioplugin: {
            deps: [
                'SoundJS'
            ],
            exports: 'createjs'
        },
        PreloadJS: {
            deps: [
                "EaselJS"
            ],
            exports: "createjs"
        },
        TweenJS: {
            deps: [
                "EaselJS"
            ],
            exports: "createjs"
        },
        assets: {
            deps: [
                "Quizted/Hacks",
                "TweenJS",
                "PreloadJS",
                "SoundJS"
            ],
            exports: "assets"
        },
        catlabassets: {
            deps: [
                "Quizted/Hacks",
                "TweenJS",
                "PreloadJS",
                "SoundJS"
            ],
            exports: "catlabintro"
        },
        portalassets: {
            deps: [
                "Quizted/Hacks",
                "TweenJS",
                "PreloadJS",
                "SoundJS"
            ],
            exports: "quizwitzremote"
        },
        easelbone: {
            deps: []
        },
        catlabremote: {
            deps: [
                "easelbone"
            ]
        }
    },
    packages: []
});

// Load the launcher.
define([
    'jquery',
    'App/Launcher'
], function ($, Launcher) {
    $.support.cors = true;

    // Some settings to get this working on cocoonjs
    if (typeof (document.cookie) == 'undefined') {
        document.cookie = '';
    }

    return Launcher;
});