/* global define */
define(
    function(require/*, exports, module*/) {
        'use strict';
        //Views
        var a = require('views/Index');
        var b = require('views/Access');

        //Return the module value
        return {
            Index: a,
            Access: b
        };
    }
);