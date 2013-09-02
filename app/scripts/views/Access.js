/* global define, aspect, $, _, console */
define(
    [
        'Page',
        'Dialog',
        'templates.jade/access',
        'views/dialog/Login',
        'views/dialog/Signup',
        'model/Signup'
    ],
    function(Page, Dialog, content, Login, Signup, SignupModel) {
        'use strict';

        return Page.extend({
            id: 'access-view',
            className: 'home-view',
            events: (function(){
                var events = _.extend({}, Page.prototype.events, {
                    'tap #login':      'goLogin',
                    'tap #signup':     'goSignup',
                    'tap #facebook':   'goFacebook'
                });

                return events;
            })(),
            header: false,
            content: content,
            useScroll: false,
            initialize: function(){
                Page.prototype.initialize.call(this, Array.prototype.slice(arguments));

                this.render();
            },
            render: function(){
                Page.prototype.render.call(this);

                this.$content.html(this.content({i18n: this.i18n}));
                return this;
            },
            onClose: function(){
                aspect.remove(this, 'render', this.afterRender);
                if(this.dialog instanceof Dialog){
                    this.dialog.close();
                    this.dialog = null;
                }
            },
            afterRender: function(){
                var $boot = $('#boot-loader');
                if($boot.length){ $boot.remove(); }

                this.dom = {
                    loginForm: $('#access-form')
                };

                console.log(this.options, 'options');

                return this;
            },
            goLogin: function(e){
                e.preventDefault();

                if(this.dialog instanceof Dialog) {
                    this.dialog.close();
                }

                this.dialog = new Login({
                    model: this.model
                });
            },
            goSignup: function(e){
                e.preventDefault();

                if(this.dialog instanceof Dialog){
                    this.dialog.close();
                }

                this.dialog = new Signup({
                    model: new SignupModel(),
                    user: this.model
                });
            },
            goFacebook: function(e){e.preventDefault();}
        });
    }
);