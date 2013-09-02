/* global define */
define('config', function () {
    'use strict';

    var config = {
        version: '0.1 Dev',
        API: {
            URL: ''
        },

        defaultSearchRange: 5000, //Meters

        mapDefault: {
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false
        },

        footer: {
            id: 'footer',
            className: 'ui-footer',
            theme: '',
            items: []
        },

        routes: {
            home: 'home'
        },

        spinner: {
            lines: 13, // The number of lines to draw
            length: 5, // The length of each line
            width: 2, // The line thickness
            radius: 6, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb
            speed: 0.9, // Rounds per second
            trail: 80, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 5, // Top position relative to parent in px
            left: 5 // Left position relative to parent in px
        }
    };

    return config;
});