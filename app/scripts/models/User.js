/* global define, $, Backbone, _ , console*/
define([
    'models/Location',
    'config'
], function (LocationModel, config) {
    'use strict';
    return Backbone.Model.extend({
        ready: false,
        idAttribute: 'user_id',
        defaults: {
            username: null,
            password: null,
            token: null,
            location: null
        },
        labels: {
            username: 'Username',
            password: 'Password'
        },
        validation: {
            username: {
                required: true,
                pattern: 'email'
            },
            password: {
                required: true,
                minLength: 5
            }
        },
        urlRoot: config.API.URL,
        url: function () {
            return this.urlRoot + '/customer/api-token-auth/';
        },
        initialize: function () {

            this.on('sync', this.saveToLocal, this);
            this.on('change', this.saveToLocal, this);
            this.listenTo(this, 'change:location', this.saveToLocal, this);

            var savedToken = JSON.parse($.fn.cookie('token'));
            var savedLocation = savedToken && savedToken.location ? savedToken.location : false;

            //Load data form local
            if (savedToken) {
                //Create new location model if needed
                var l = new LocationModel();
                //TODO: Dont' need to save to local again, we're getting data from there
                this.set(savedToken, {
                    silent: true
                });


                //Save location if any
                if (savedLocation && savedLocation.id) {
                    l.set(savedLocation);
                }
                //Set model
                this.set({'location': l}, {silent: true});
                //Reload token if expired
                if (this.isExpired()) {
                    this.reload();
                } else {
                    //Not expired? we're ready then :)
                    this.ready = true;
                    this.trigger('ready');
                }
            } else {
                Backbone.trigger('token.error');
            }
        },
        fetch: function (options) {
            options = options || {};
            //Success callback
            options.success = function () {
                this.ready = true;
                this.trigger('ready');
            }.bind(this);

            return Backbone.Model.prototype.fetch.call(this, options);
        },
        parse: function (response) {
            if (response && response.expiration_timestamp) {
                response.expiration_timestamp *= 1000;
            }

            return response;
        },
        //Tells when the token is loaded/ready
        isReady: function () {
            return this.ready;
        },
        isExpired: function () {
            //var now = (new Date()) * 1;
            //var expires = this.get('expiration_timestamp');
            return false;
            //return (now - expires) > 0;
        },
        isAuthenticated: function () {
            var userId = this.get('token');
            if (userId) {
                return !_.isNull(userId) && userId !== -1;
            }

            return false;
        },
        isInVenue: function () {
            console.log(this.location, 'location check');
            var l = this.get('location');

            if(l && l instanceof LocationModel && l.get('id')){ return true; }
            else{return false;}
        },
        //Set state as not ready and fetch data again
        reload: function () {
            this.ready = false;
            this.fetch();
        },
        saveToLocal: function () {
            var data = this.toJSON();
            var l = data.location;
            if(l && l instanceof LocationModel){
                l = data.location.toJSON();
            }else{
                l = {};
            }
            //Convert location to cookie-compatible object
            data.location = l;

            $.fn.cookie('token', JSON.stringify(data));
        },
        //Logout but keep the object for future usage
        logout: function () {
            this.clear({
                silent: true
            });
            this.ready = false;
            $.fn.cookie('token', null);
            //Let the app know that we're out of the system
            Backbone.trigger('session.logout');
        },
        //Completly destroy the object
        destroy: function () {
            this.clear();

            this.off('sync', this.saveToLocal);
            this.off('change', this.saveToLocal);

            $.fn.cookie('token', null);
        }
    });
});