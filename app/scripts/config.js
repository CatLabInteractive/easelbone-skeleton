define ([], function () {

    // Read base url from require.js config.
    if (typeof (BASE_URL) == 'undefined') {
        var BASE_URL = (
            requirejs.s.contexts._.config.baseUrl.substr(
                0,
                requirejs.s.contexts._.config.baseUrl.length - "scripts/".length
            )
        );
    }

    if (typeof (window.PROXY_URL) == 'undefined') {
        window.PROXY_URL = BASE_URL;
    }

    var Config = {
        'BASE_URL' : BASE_URL,
        'SOUND_URL' : BASE_URL + 'sounds/',

        'REMOTE_HOST' : 'remote.catlab.eu',

        'PROXY_URL' : window.PROXY_URL + 'php/proxy.php?url=',
        'IMAGE_PROXY_URL' : window.PROXY_URL + 'php/attachment?url=',
        'VIEWS_URL' : 'http://canvas.quizwitz.com/',

        'MODS_LIST_URL' : '/php/mods.php',
        'MODS_BASE_URL' : '/mods/',


        'Fonts'  : {
            'Default' : 'sans-serif'
        },

        'i18nlite' : {
            'path' : BASE_URL + 'locales/'
        },
        'LANGUAGE' : 'en'
    };

    Config.ENV = typeof(CONFIG_ENV) != 'undefined' && CONFIG_ENV ? CONFIG_ENV : 'browser';


    switch (window.location.host)
    {

        case 'localhost':
            // Custom config settings
            break;
    }

    // Alter config based on query parameters?
    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray( prmstr ) {
        var params = {};
        var prmarr = prmstr.split("&");
        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    var params = getSearchParameters();
    if (typeof(params.lang) != 'undefined' && params.lang) {
        Config.LANGUAGE = params.lang;
    }

    return Config;

});