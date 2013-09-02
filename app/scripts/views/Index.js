/* global define */
define(
    [
        'Page',
        'templates.jade/index'
    ],
    function(Page, template) {
        'use strict';

        return Page.extend({
            id: 'home',
            className: 'home-view w-footer',
            header: false,
            content: template,
            useScroll: false,
            initialize: function(){
                Page.prototype.initialize.call(this, Array.prototype.slice(arguments));

                this.render();
            }
        });
    }
);