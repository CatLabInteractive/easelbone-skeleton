define(
    [
        'App/Controllers/AppController'
    ],
    function(
        AppController
    ) {

        var Factory = function()
        {

        };

        var p = Factory.prototype;

        /**
         * @param controller
         * @param args
         * @param name
         * @returns {Controller}
         */
        p.getController = function(name, controller, args)
        {
            var c = new controller(args[0], args[1]);

            App.EventManager.trigger('controller:create', c);
            App.EventManager.trigger('controller:' + name + ':create', c);

            return c;
        };

        /**
         * @returns {Controller}
         */
        p.getAppController = function()
        {
            return this.getController('app', AppController, arguments);
        };

        return new Factory();

    }
);