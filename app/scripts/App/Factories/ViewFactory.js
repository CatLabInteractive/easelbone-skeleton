define(
    [
        'CatLab/Views/Loading',

        'App/Views/Index'
    ],
    function(
        Loading,

        Index
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
        p.getView = function(name, controller, args)
        {
            var c = new controller(args[0], args[1]);

            App.EventManager.trigger('view:create', c);
            App.EventManager.trigger('view:' + name + ':create', c);

            return c;
        };

        /**
         * @returns {Controller}
         */
        p.getLoadingView = function()
        {
            return this.getView('loading', Loading, arguments);
        };

        /**
         * @returns {Controller}
         */
        p.getIndexView = function()
        {
            return this.getView('index', Index, arguments);
        };

        return new Factory();

    }
);