images = window.images || {};

define (
    [
        'easelbone',
        'underscore',
        'backbone',
        'i18n-lite',
        'EaselJS',
        'config',
        'jquery',
        'cordovaaudioplugin'
    ],
    function (
        easelbone,
        _,
        Backbone,
        i18n,
        createjs,
        Config,
        $,
        cordovaaudioplugin
    ) {
        // Install sounds
        createjs.Sound.alternateExtensions = ["mp3"];

        // Install cordova
        createjs.Sound.registerPlugins([
            createjs.WebAudioPlugin,
            createjs.HTMLAudioPlugin
        ]);

        // Regular loader
        var loader = new createjs.LoadQueue(false);
        //loader.installPlugin(Sound.Sound);

        var spritemaps = [

        ];

        var assetsToLoad = 0;
        var assetsLoaded = 0;

        var soundsToLoad = spritemaps.length;
        var soundsLoaded = 0;

        // Since loading sound files takes quite a bit longer, we multiply the amound of
        // sounds to load with soundToAssetRatio, thus providing a better progress reporting.
        var soundToAssetRatio = 1;

        loader.addEventListener ('progress', function (e) {
            assetsToLoad = e.total;
            assetsLoaded = e.loaded;

            updateLoadingScreen();
        });

        function updateLoadingScreen()
        {
            App.LoadingScreen.setProgress (
                assetsLoaded + (soundsLoaded * soundToAssetRatio),
                assetsToLoad + (soundsToLoad * soundToAssetRatio)
            );
        }

        return {

            'load' : function (callback)
            {
                if (typeof(callback) == 'undefined') {
                    callback = function() {};
                }

                var state = $.Deferred();

                // Extend the app to allow events.
                _.extend(App, Backbone.Events);

                // Hacky hacky to disable buttonhelper
                createjs.ButtonHelper = easelbone.EaselJS.DisabledButtonHelper;

                this
                    .loadAssets()
                    .then(this.loadSounds.bind(this))
                    .then(function() {
                        state.resolve();
                        callback();
                    });

                // Also load fonts
                this.loadFonts ();

                return state.promise();
            },

            'loadAssets': function ()
            {
                var state = $.Deferred();
                state.resolve();
                return state.promise();
            },

            'loadSounds' : function()
            {
                var state = $.Deferred();
                state.resolve();
                return state.promise();
            },

            'loadFonts' : function ()
            {

            },

            /**
             *
             * @param evt
             */
            'handleFileLoad' : function (evt) {
                if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
            }
        };
    }
);

