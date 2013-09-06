/* global define */
define(
    function(require/*, exports, module*/) {
        'use strict';
        //Views
        var a = require('views/ui/Page');
        var b = require('views/ui/Dialog');
        var c = require('views/ui/Footer');
        var d = require('views/ui/Spinner');

        var e = require('models/User');
        var f = require('models/Location');
        var g = require('models/ShoppingCart');

        var h = require('exceptions/Redirect');

        //Return the module value
        return {
            view: {
                Page: a,
                Dialog: b,
                Footer: c,
                Spinner: d
            },
            model: {
                User: e,
                Location: f,
                ShoppingCart: g
            },
            exception: {
                Redirect: h
            }
        };
    }
);