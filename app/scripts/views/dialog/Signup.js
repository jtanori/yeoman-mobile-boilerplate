/* global define, i18n */
define([
    'views/ui/Dialog',
    'templates.jade/signup',
    'models/CreditCard',
    'views/dialog/CreditCard'
], function (Dialog, content, CreditCardModel, CreditCardDialog) {
    'use strict';

    return Dialog.extend({
        id: 'signup-view',
        className: 'dialog no-auth al-left',
        config: {
            title: i18n.Signup,
            content: content(),
            buttons: [{
                id: 'js-dialog-signup',
                className: 'btn-secondary',
                href: "#",
                icon: {
                    name: "lock"
                },
                text: i18n.Signup,
                tagName: 'button',
                type: 'submit'
            }, {
                id: 'js-dialog-close',
                className: 'btn-link js-dialog-close',
                href: "#",
                text: i18n.Cancel
            }],
            name: "signup-form",
            header: true,
            form: true,
            spinnerLabel: 'Working...'
        },
        openOnRender: false,
        useScroll: false,
        events: (function () {
            var events = _.extend({}, Dialog.prototype.events, {
                'tap #js-dialog-signup': 'doRegister',
                'tap #cancel-signup': 'cancelSignup',
                'tap #do-signup': 'doRegister',
                'submit #signup-form': 'doRegister'
            });

            return events;
        })(),
        initialize: function () {
            Dialog.prototype.initialize.apply(this, arguments);

            this.listenTo(this.model, 'sync', this.onRegister, this);
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
            this.show();

            var $boot = $('#app-boot');
            if ($boot.length) $boot.remove();

            $('#username').focus();

            return this;
        },
        cancelSignup: function () {

            this.close();
            Backbone.history.navigate('#login', {
                trigger: true,
                replace: false
            });

        },

        showLoading: function(){
            Dialog.prototype.showLoadingIndicator.call(this, i18n['Working...']);
        },

        doRegister: function (event) {
            event.preventDefault();
            var $form = $('#signup-form');

            var data = {
                email: $form.find('[name=username]').val(),
                password1: $form.find('[name=password]').val(),
                password2: $form.find('[name=password-confirm]').val(),
                acceptTos: $form.find('[name=accept-tos]').prop('checked')
            };
            this.model.set(data, {silent: true});
            this.model.save();
        },

        onRegister: function () {
            var data = this.model.toJSON();

            data.password = data.encoded_password;

            delete data.password1;
            delete data.password2;
            delete data.encoded_password;

            this.options.user.set(data);
            console.log('on register', data, this.options.user);

            this.close();
            

            if (this.dialog instanceof Dialog) {
                this.dialog.close();
            }
            
            var model = new CreditCardModel();
            this.dialog = new CreditCardDialog({
                model: model,
                action: 'setup',
                user: this.options.user
            });
            
            /*
            Backbone.history.navigate('settings/creditcard/setup', {
                trigger: true,
                replace: true
            });*/
            
        },
        //Override dialog onError
        onError: function (model, xhr, options) {
            var response = {};
            var errs = [];

            try {
                response = JSON.parse(xhr.responseText);

                _.each(response, function (item, i) {
                    errs.push(item);
                });

                this.renderError(errs);
            } catch (e) {
                this.renderError('An unexpected error has occurred.\nPlease try again later');
            }
        },
    });
});