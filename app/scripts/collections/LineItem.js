/* global define, Backbone */
define([
	'models/LineItem'
], function (LineItem) {
	'use strict';
	return Backbone.Collection.extend({
		'model': LineItem,
		'updateItemQuantity': function (id, qty) {
			var item = this.get(id);

			item.set({'quantity': qty});

			this.add(item);
		},
		'fetch': function () {},
		'save': function () {}
	});
});