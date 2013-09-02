/* global Backbone, define, console */
define(
    function () {
        'use strict';
        var model = Backbone.Model.extend({
            defaults: {
                url: '',
                name: '',
                nickname: '',
                address: '',
                city: '',
                stateAbbr: '',
                location: '',
                capacity: 0,
                venueorg: null,
                checkin: false
            },
            url: function () {
                return this.get('url');
            },
            initialize: function () {
                console.log('Initialize Location model');
            }
        });

        return model;
    }
);