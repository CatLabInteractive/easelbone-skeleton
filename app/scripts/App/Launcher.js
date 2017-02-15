define (
    [
        'easelbone',
        'jquery',
        'underscore',

        'config',
        //'catlabremote',
        'EaselJS',
        'i18n-lite',

        'CatLab/Utils/HashParser',
        'CatLab/Utils/BrowserCheck',
        'CatLab/Utils/EventManager',

        'App/Factories/ControllerFactory',
        'App/Factories/ViewFactory',

        'App/Loader'
    ],
    function (
        easelbone,
        jquery,
        underscore,

        Config,
        //catlabremote,
        createjs,
        i18nlite,

        HashParser,
        BrowserCheck,
        EventManager,

        ControllerFactory,
        ViewFactory,

        Loader
    ) {
        var options = {};

        //var Webremote = catlabremote.Webcontrol;

        return {
            canvas : null,
            prepared : false,
            loadingDeferred : null,
            options : {},

            setOptions : function (aOptions)
            {
                underscore.extend(this.options, aOptions);
            },

            /**
             * Parse options
             * @returns {{}}
             */
            parseOptions : function()
            {
                // Process hash parameters
                var parameters = HashParser.getParameters ();

                // Parse options

                return options;
            },

            /**
             * The default start method. Check what to do based on
             * the path parameters.
             * @param aOptions
             */
            start : function (aOptions)
            {
                this.prepare(aOptions).then(function ()
                {
                    // Start
                    var controller = ControllerFactory.getAppController();
                    App
                        .EventManager
                        .trigger('appcontroller:initialize', controller)
                        .done(
                            function()
                            {
                                controller.index(this.parseOptions());
                            }.bind(this)
                        );

                }.bind(this));
            },

            prepare : function (aOptions)
            {
                var dfd = jquery.Deferred();

                this.log('Preparing game');

                this.setOptions (aOptions);

                if (this.loadingDeferred == null) {
                    this.loadingDeferred = jquery.Deferred();
                }

                this.loadingDeferred.promise().done(function()
                {
                    dfd.resolve();
                });

                if (this.prepared) {
                    // Already loading, we're done here.
                    return;
                }

                var self = this;

                // Event manager
                App.EventManager = new EventManager ();

                // First do a browser check
                BrowserCheck.check()

                    // Do some preparations
                    .then(function ()
                    {
                        var state = jquery.Deferred();

                        self.prepared = true;
                        self.canvas = document.createElement ("canvas");

                        self.setCanvasSize ();

                        if (typeof (options.element) !== 'undefined') {
                            options.element.appendChild (self.canvas);
                        }
                        else {
                            document.body.appendChild (self.canvas);
                        }

                        // Loading screen
                        App.LoadingScreen = ViewFactory.getLoadingView(self.canvas);
                        App.LoadingScreen.start ();

                        state.resolve();

                        return state;
                    })

                    // Launch an event
                    .then(function() {
                        return App.EventManager.trigger('launcher:prepare:start')
                    })

                    // Initialize web control assets
                    .then(function() {
                        /*
                        var state = jquery.Deferred();
                        Webremote.initializeCreateJS(function() {
                            state.resolve();
                        });

                        return state.promise();
                        */
                    })

                    // Load i18n
                    .then(function() {
                        i18nlite.changeLanguage(Config.LANGUAGE);
                        return i18nlite.initialize (
                            Config.i18nlite
                        );
                    })

                    // Initialize web control
                    .then(
                        function() {

                            var promise1 = this.loadWebremote();
                            var promise2 = Loader.load();

                            var promise = jquery.Deferred();
                            jquery.when(promise1, promise2).done(function() {
                                promise.resolve();
                            });

                            return promise.promise();

                        }.bind(this)
                    )

                    // And done. Start the stage.
                    .done(function() {

                        // Load the hacks
                        this.hacks();

                        self.initStage (function() {
                            App.EventManager.trigger ('launcher:prepare:done').done(function() {
                                this.log('Done preparing');
                                this.loadingDeferred.resolve();
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));

                // Assign resize event
                window.onresize = function () { self.resize (); };

                return dfd.promise();
            },

            loadWebremote : function()
            {
                // Nothing to do here yet.
                return;

                var state = jquery.Deferred();

                //Webremote.setAssets (portalassets);
                Webremote.initialize
                ({
                    event: Config.EVENT,
                    host: Config.REMOTE_HOST,
                    debug: false,
                    protocol: 'http',
                    proxy : Config.PROXY_URL,
                    imageproxy: Config.IMAGE_PROXY_URL,
                    translator: i18nlite,

                    callback: function ()
                    {
                        Webremote.loadViews (Config.VIEWS_URL + 'controllerviews.xml');

                        Webremote.oAuth (Config.oauth2);

                        // The Keyboard User
                        if (
                            typeof(this.options.keyboard) == 'undefined' ||
                            this.options.keyboard
                        ) {
                            App.KeyboardUser = new catlabremote.Controls.Keyboard();
                            Webremote.addCustomControl(App.KeyboardUser);
                        }

                        Webremote.enableGamepads ();

                        /*
                         App.KeyboardUser = new WebcontrolUserKeyboard ();
                         Webcontrol.Webcontrol.addCustomControl (App.KeyboardUser);
                         */

                        state.resolve();
                    }.bind(this)
                });

                return state;
            },

            initStage : function (callback) {

                App.EventManager.trigger('launcher:stage:start').done(function()
                {
                    App.LoadingScreen.stop ();

                    var properties = {

                    };

                    properties.font = Config.Fonts.Default;
                    properties.textColor = 'white';

                    easelbone.setProperties(properties);

                    App.RootView = new easelbone.Views.Root ({ 'canvas' : this.canvas });
                    App.RootView.stage.enableMouseOver(20);

                    //createjs.Ticker.setFPS (assets.properties.fps);
                    createjs.Ticker.addEventListener('tick', this.tick.bind(this));

                    App.EventManager.trigger('launcher:stage:done').done(callback);

                }.bind(this));
            },

            tick: function()
            {
                // Speech.onRenderFrame();
            },

            setCanvasSize : function () {
                if (typeof (options.element) !== 'undefined') {

                    this.canvas.width = options.element.offsetWidth;
                    this.canvas.height = options.element.offsetHeight;
                }
                else {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                }
            },

            resize : function ()
            {
                this.setCanvasSize ();

                if (typeof (App.RootView) != 'undefined') {
                    App.RootView.resize();
                }
            },

            /**
             * Log
             * @param log
             */
            log : function(log)
            {
                console.log('[Launcher]', log);
            },

            /**
             * Initialize some hacks if required
             */
            hacks : function()
            {

            }
        };
    }
);