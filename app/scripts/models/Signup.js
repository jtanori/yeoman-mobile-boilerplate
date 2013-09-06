/* global define, Backbone, _, console */
define([
    'config'
], function (config) {
	'use strict';
    return Backbone.Model.extend({
        defaults: {
            email: null,
            password1: null,
            password2: null
        },

        labels: {
            email: 'Username',
            password1: 'Password',
            password2: 'Password verification'
        },

        validation: {
            email: {
                required: true,
                pattern: 'email'
            },
            password1: {
                required: true,
                minLength: 5
            },
            password2: function (value, attr, computedState) {
                if (value !== computedState.password1) {
                    return 'Password confirmation does not match Password';
                } else if (_.isEmpty(value)) {
                    return 'Password confirmation is required';
                }
            }
        },
        urlRoot: config.API.URL,
        url: function () {
            return this.urlRoot + 'customer/api/newcustomer/';
        },
        initialize: function () {
            this.on('sync', this.onRegister, this);
            this.on('error', this.onError, this);
            this.on('validated:invalid', this.onValidationError, this);
        },

        onValidationError: function () {
            console.log('validation error', arguments);
        },
        onError: function () {
            //console.log('on error', arguments);
        },
        onRegister: function () {
            console.log('register', arguments);
        }
    });
});