/* global define, i18n, aspect, $, Backbone */
define([
    'views/ui/Dialog',
    'templates.jade/login'
], function (Dialog, content) {
    'use strict';

    return Dialog.extend({
        id: 'login-view',
        className: 'dialog no-auth al-left',
        config: {
            title: i18n.Login,
            content: content(),
            buttons: [{
                id: 'js-dialog-login',
                className: 'btn-secondary',
                href: "#",
                icon: {
                    name: "key"
                },
                text: i18n.Login,
                tagName: 'button',
                type: 'submit'
            }, {
                id: 'js-dialog-close',
                className: 'btn-link js-dialog-close',
                href: "#",
                text: i18n.Cancel
            }],
            name: "login-form",
            header: true,
            form: true,
            spinnerLabel: i18n['Working...']
        },
        openOnRender: false,
        useScroll: false,
        events: (function () {
            var events = _.extend({}, Dialog.prototype.events, {
                'tap #js-dialog-login': 'doLogin',
                'submit #login-form': 'doLogin'
            });

            return events;
        })(),
        initialize: function () {
            Dialog.prototype.initialize.apply(this, arguments);

            this.listenTo(this.model, 'sync', this.onLogin, this);
            this.listenTo(this.model, 'error', this.onError, this);
            this.listenTo(this.model, 'validated:invalid', this.onValidationError, this);
            this.listenTo(this.model, 'request', this.showLoading, this);
            //Reposition after these events
            aspect.add(this, ['clearError', 'renderError'], this.show.bind(this), 'after');
            aspect.add(this, ['renderError'], this.hideLoadingIndicator.bind(this), 'before');
        },
        onClose: function () {
            this.stopListening(this.model);

            aspect.remove(this, ['clearError', 'renderError'], this.show.bind(this), 'after');
            aspect.remove(this, ['renderError'], this.hideLoadingIndicator.bind(this), 'before');
        },
        afterRender: function () {
            console.log(this, 'after render');
            this.show();

            var $boot = $('#app-boot');
            if ($boot.length) $boot.remove();

            $('#username').focus();

            return this;
        },
        showLoading: function(){
            Dialog.prototype.showLoadingIndicator.call(this, i18n['Working...']);
        },
        doLogin: function (event) {
            event.preventDefault();

            var $form = this.dom.form;
            var u = $form.find('[name=username]').val();
            var p = $form.find('[name=password]').val()
            this.model.set({username: u, password: p}, {silent: true});

            this.model.save();
        },

        onLogin: function () {
            this.close();
            Backbone.history.navigate('#home', {
                trigger: true,
                replace: true
            });
        }
    });
});