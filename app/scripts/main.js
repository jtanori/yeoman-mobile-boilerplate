require.config({
    paths: {
        'zepto': '../bower_components/zepto/zepto',
        'zepto-touch': '../bower_components/zeptojs/src/touch',
        'zepto-range': '../bower_components/zepto-range/zepto-range',
        'zepto-cookie': '../bower_components/zepto-cookie/zepto.cookie',

        'underscore': '../bower_components/lodash/lodash',
        'backbone': '../bower_components/backbone/backbone',
        'backbone.validation': '../bower_components/backbone-validation/src/backbone-validation',

        'i18n': '../bower_components/requirejs-i18n/i18n',
        'domReady': '../bower_components/requirejs-domready/domReady',
        'async': '../bower_components/requirejs-plugins/src/async',

        'spinjs': '../bower_components/spin.js/spin',
        'ftscroller': '../bower_components/ftscroller/lib/ftscroller',
        'aspect': '../bower_components/aspect.js/src/aspect',
        'functional': '../bower_components/aspect.js/src/functional',
        'infobox': 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox_packed',
        'bootstrap': 'vendor/bootstrap',

        'setup': 'setup',
        'config': 'config',
        'jade': 'templates/jade',
        'templates.jade': 'templates/',

        'app': 'routers/App',
        'Page': 'views/ui/Page',
        'Dialog': 'views/ui/Dialog',
        'Footer': 'views/ui/Footer'
    },
    shim: {
        'zepto': {
            exports: '$'
        },
        'zepto-range': ['zepto'],
        'zepto-touch': ['zepto'],
        'zepto-cookie': ['zepto'],

        'backbone': {
            deps: ['zepto', 'underscore'],
            exports: 'Backbone'
        },
        'backbone.validation': {
            deps: ['backbone'],
            exports: 'Backbone.Validation'
        },
        'underscore': {
            exports: '_'
        },
        'app': {
            deps: [
                'backbone',
                'backbone.validation',
                'spinjs',
                'setup',
                'jade',
                'zepto-touch',
                'zepto-cookie',
                'ftscroller'
            ]
        },
        'setup': {
            deps: ['backbone', 'functional', 'aspect']
        },
        'ftscroller': {
            exports: 'FTScroller'
        },
        'aspect': {
            deps: ['functional'],
            exports: 'aspect'
        },
        'jade': {
            exports: 'jade'
        },

        'infobox': {
            deps: ['gmaps'],
            exports: 'InfoBox'
        }
    },
    //Default to english
    config: {
        i18n: {
            locale: 'en-us'
        }
    }
});

var root = this;
// Set environment
this.ENV = 'PROD';

//>>excludeStart("envExclude", pragmas.envExclude);
//Override environment in server mode
//This is excluded by the build script
this.ENV = 'DEV';
//>>excludeEnd("envExclude");

//>>excludeStart("i18nExclude", pragmas.i18nExclude);
// Override locale only if not in DEV mode, 
// use the object in require.config above to change the language
if (this.ENV === 'PROD') {
    (function () {
        'use strict';

        var locale = 'en-us';
        //You can add more lang options by using pragmas, see lines below

        // Francais example
        //>>excludeStart("i18nExcludeFrFr", pragmas.i18nExcludeFrFr);
        locale = 'fr-fr';
        //>>excludeEnd("i18nExcludeFrFr");

        this.require.config({
            config: {
                i18n: {
                    locale: locale
                }
            }
        });

    }).call(this);
}
//>>excludeEnd("i18nExclude");

//Upload progress logger
(function () {
    var updateModuleProgress = function (context, map) {
        //when dom is not ready, do something more useful?
        var console = this.console || {};
        if (console && console.log) {
            console.log('loading: ' + map.name + ' at ' + map.url);
        }
    };

    require.onResourceLoad = function (context, map, depMaps) {
        updateModuleProgress(context, map, depMaps);
    };
}).call(this);

//Google maps async definition
define(
    'gmaps', ['async!http://maps.google.com/maps/api/js?v=3&libraries=geometry&sensor=true'],
    function () {
        return window.google.maps;
    }
);

//Main initialization block
//TODO: Optimize displaying this block
require(['domReady', 'spinjs', 'config', 'i18n!nls/app'], function (domReady, Spinner, config, i18n) {
    var target = document.getElementById('boot-spinner');
    //Create new spinner
    new Spinner(config.spinner).spin(target);

    var versionLabel = document.getElementById('boot-version');

    versionLabel.innerHTML = config.version;
    //Async from router loading
    //TODO: Better sync between domReady, Cordova and Router
    domReady(function () {
        //Implement updateModuleProgress only if not in prod mode
        if (root.ENV === 'DEV') {
            //re-implement updateModuleProgress here for domReady
            var updateModuleProgress = function (context, map) {
                var document = root.document;
                var loadingStatusEl = document.getElementById('boot-status');
                var loadingModuleNameEl = document.getElementById('boot-module');

                //first load
                if (loadingStatusEl && loadingModuleNameEl) {
                    loadingStatusEl.innerHTML = loadingStatusEl.innerHTML += '.'; //add one more dot character
                    loadingModuleNameEl.innerHTML = map.name + (map.url ? ' at ' + map.url : '');
                } else {
                    //TODO later load, must have loading indicator for this then
                }
            };
            //Re-implement onReasourceLoad override, prevent requirejs "compilation" conflicts
            require.onResourceLoad = function (context, map, depMaps) {
                updateModuleProgress(context, map, depMaps);
            };
        }
    });
    //Assign lang to the root object
    root.i18n = i18n;
    //start the router and load the lang bundle
    require(['app'], function (Router) {
        root.App = root.App || {};
        root.App.Router = Router;
        //Start the module router
        Router.start();
    });
});