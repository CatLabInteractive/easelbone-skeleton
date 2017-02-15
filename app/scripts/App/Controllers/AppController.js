define(
    [
        'backbone.controller',

        'App/Factories/ViewFactory'
    ],
    function(
        BackboneController,

        ViewFactory
    ) {

        return BackboneController.extend({

            index: function()
            {
                var view = ViewFactory.getIndexView();
                App.RootView.setView(view);
            }

        });

    }
);