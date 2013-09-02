/* global define, Backbone */
define([
    'collections/LineItem'
], function (LineItemsCollection) {
    'use strict';
    return Backbone.Model.extend({

        'products': new LineItemsCollection(),
        'isLoaded': false,
        'userName': null,
        'defaults': {
            'products': null,
            'gratuity': 0,
            'gratuityPercent': 0,
            'user': null
        },
        'url': function () {
            return '';
        },
        'initialize': function (options) {
            this.bindEvents();

            if (options.products) {this.products.add(options.products);}

            if (options.userName) {
                this.userName = options.userName;
                this.set('user', this.userName);
            }
        },
        /**
         * Binds the events of the line items collection.
         * @returns {Object} reference to self
         */
        'bindEvents': function () {
            this.products.on('reset add change', this.propagateChange, this);
        },
        /**
         * Adds an element to the collection.
         * @param {Obejct}
         * @param {Object}
         * @returns {Object} reference to self
         */
        'addLineItem': function () {},
        /**
         * Removes an item from the collection.
         * @param {Number/String}
         * @retruns {Object} reference to self
         */
        'removeLineItem': function () {},
        /**
         * Gets the number objects in the line items collection.
         * @returns {Numeric}
         */
        'getTotalItems': function () {
            return this.products.length || 0;
        },

        /**
         * Returns total count of products in the cart
         */
        totalProducts: function () {
            var items = this.get('products');
            var total = 0;

            items.each(function (item) {
                total += parseInt(item.get('quantity'), 10) || 0;
            });

            return total;
        },
        'toJSON': function () {
            var parsed = this.get('products').toJSON();

            return {
                'products': parsed,
                'gratuity': this.get('gratuity'),
                'user': this.userName
            };
        },
        /**
         * Saves the current state of the model
         * in the browser's local storage.
         */
        'saveToLocalStorage': function () {
            var id = this.userName || 'guest';
            var data = this.toJSON();

            localStorage.setItem('shoppingCart-' + id, JSON.stringify(data));
        },
        /**
         * Fetch data internally
         *	@returns {object}
         */
        'fetchFromLocal': function () {
            //GET user id or ser it as guest
            var id = this.userName || 'guest';
            //Get data for this user
            var data = localStorage.getItem('shoppingCart-' + id) || [];

            var products = this.get('products') || new LineItemsCollection();

            if (data.length) {products.add((JSON.parse(data)).products);}

            this.set({
                'products': products
            });

            return this;
        },
        /**
         * Fires a update event on the pub/sub system.
         */
        propagateChange: function () {
            Backbone.trigger('cart.update');
        },
        /*
         * Empty the cart
         */
        clear: function () {

            this.products.reset();
            this.products = null;
            Backbone.trigger('cart.clear');

        },
        /**
         *
         */
        'empty': function () {
            var id = this.userName || 'guest';

            this.set({
                'products': null,
                'gratuity': 0,
                'gratuityPercent': 0
            }, {
                'silent': true
            });

            localStorage.removeItem('shoppingCart-' + id);
        },
        /**
         *
         */
        'getTotals': function () {}
    });
});