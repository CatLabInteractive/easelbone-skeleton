define(
    [
        'EaselJS',
        'easelbone',
        'App/Views/Base'
    ],
    function(
        createjs,
        easelbone,
        BaseView
    ) {

        return BaseView.extend({

            render: function()
            {
                var container = new createjs.Container();
                container.setBounds (0, 0, 200, 100);

                container.x = 20;
                container.y = 20;

                var text = new createjs.BigText (
                    "Hello World",
                    "verdana",
                    "#ff0000"
                );

                text.debug = true;
                container.addChild (text);

                this.el.addChild (container);
            }

        });

    }
);