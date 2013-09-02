/* global Backbone, define */
define(function () {
    'use strict';

    return Backbone.Model.extend({
        'idAttribute': 'id',
        'defaults': {
            'quantity': 0
        },
        'fetch': function () {},
        'save': function () {}
    });
});