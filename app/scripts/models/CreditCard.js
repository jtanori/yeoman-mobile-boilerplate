/* global Backbone, define, console */
define(['config'],function (config) {
	'use strict';
    var model = Backbone.Model.extend({
        urlRoot: config.API.URL,
        url: function () {
            return this.urlRoot + '/customer/api/customer/3/cc/';
        },
        'defaults': {
            number: '',
            type: '',
            expirationDateMonth: '',
            expirationDateYear: '',
            cvv: '',
            name: ''
        },
        validation: {
            number: function (value, attr, computedState) {
                var pattern;
                switch (computedState.type) {
                case 'Master Card':
                    pattern = /^\d{16}$/;
                    break;
                case 'Visa':
                    pattern = /(^\d{16}$)|(^\d{13}$)/;
                    break;
                case 'American Express':
                    pattern = /^\d{15}$/;
                    break;
                default:
                    return 'Invalid number card.';
                }

                if (!value.toString().match(pattern)) {
                    return 'Invalid number card.';

                }
            },
            type: {
                required: true,
                oneOf: ['Visa', 'Master Card', 'American Express']
            },
            expirationDateMonth: function (value, attr, computedState) {
                var d = new Date();
                var month = d.getMonth() + 1;
                var year = d.getFullYear();

                if ((parseInt(computedState.expirationDateYear, 10) + 2000) < year) {
                    return 'Expiration date must be a future date';
                }

                console.log((parseInt(computedState.expirationDateYear, 10) + 2000), year);

                if ((parseInt(computedState.expirationDateYear, 10) + 2000) === year) {
                    if (parseInt(value, 10) < month) {
                        return 'Expiration date must be a future date.';
                    }
                }
            },
            expirationDateYear: {
                required: true,
                range: [13, 28]
            },
            cvv: {
                required: true,
                pattern: /^\d{3,4}$/g,
                msg: 'Invalid cvv number.'
            },
            name: {
                required: true,
                pattern: /^[a-zA-Z\s\.]*$/g,
                msg: 'Name only can content letters and dot (.) '
            }
        },
        'initialize': function () {
            console.log('Initiaize credit card model');
        }
    });

    return model;
});