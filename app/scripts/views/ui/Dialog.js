/*global _, $, Backbone, define, aspect, FTScroller */
define([
    'view/Spinner',
    'config',
    'templates.jade/dialog_generic',
    'templates.jade/empty'
], function (Spinner, config, template, empty) {
    'use strict';

    return Backbone.View.extend({
        template: template,
        config: {
            content: empty(),
            buttons: [],
            header: true,
            title: '',
            name: 'info',
            form: false,
            spinnerLabel: 'Loading...'
        },
        openOnRender: true,
        id: 'dialog',
        className: 'dialog dialog-generic',
        ready: false,
        useScroll: false, //We dont' need scroller by default, use it for large dialogs
        //Base events, add as many as needed by the dialog chrome
        //TODO: Handle multiple dialogs
        events: {
            'tap .js-dialog-overlay': 'close',
            'tap .js-dialog-close': 'close',
            'focus input': 'clearError',
            'load img': 'adjust'
        },
        i18n: {},
        dom: {},
        refreshAfterMethods: ['render'],
        initialize: function (options, events) {
            this.events = _.extend(this.events, events);

            window.addEventListener('resize', this.adjust.bind(this), false);

            aspect.add(this, 'render', this.afterRender.bind(this), 'after');

            this.render();
        },

        render: function () {
            var data = this.config;
            //Keep i18n lines out of config, less messy
            data.i18n = this.i18n;

            var $dialog = $(this.template(data));

            this.$el.append($dialog).hide();
            this.$dialog = this.$el.find('.dialog-container');

            $('body').append(this.$el);
            //Will render and open dialog on instantiation time
            if (this.openOnRender) {
                this.show();
            }
            //Is ready flag
            this.ready = true;
            //Adjust on img load
            this.$el.find('img').on('load', function () {
                this.adjust();
            }.bind(this));
            //Cache the form if it is used
            if (this.config.form) {
                this.dom.form = $('#' + this.config.name);
            }

            this.$scroller = this.$el.find('.dialog-scroller');
            this.$buttons = this.$el.find('.dialog-buttons');

            if (this.useScroll) {
                
                var scrollerHeight = this.$scroller.height();
                var buttonsHeight = this.$buttons.height();
                var h = scrollerHeight - buttonsHeight;
                
                this.$scroller.height(h);
                this.$el.addClass('w-scroller');

                setTimeout(function () {
                    this.scroll = new FTScroller(
                        this.$scroller[0], {
                            scrollingX: false,
                            alwaysScroll: true,
                            hardwareAccelarated: false,
                            updateOnWindowResize: true,
                            enableRequestAnimationFrameSupport: false,
                            scrollbars: false,
                            bouncing: false,
                            maxFlingDuration: 100,
                            scrollBoundary: 0,
                            scrollResponseBoundary: 0
                        }
                    );
                    this.adjust();
                }.bind(this), 0);
            }

            return this;
        },

        preventDefault: function (e) {
            e.preventDefault();
        },

        showLoadingIndicator: function () {
            if (this.spinner instanceof Spinner) {
                this.spinner.spin();
                return this.$el;
            }

            this.spinner = new Spinner({
                options: {
                    label: this.config.spinnerLabel
                },
                appendTo: '#' + this.id + ' .dialog-container'
            });

            this.spinner.spin();

            return this.$el;
        },

        hideLoadingIndicator: function () {
            if (this.spinner instanceof Spinner) {
                this.spinner.stop();
                return this.$el;
            }
        },

        afterRender: function () { /* override with yours */ },
        //Adjust position on center of the screen
        adjust: function () {
            var h = this.$dialog.height();
            var w = this.$dialog.width();
            this.$dialog.css({
                'margin-top': '-' + h / 2 + 'px',
                'margin-left': '-' + w / 2 + 'px'
            });
        },
        //Make it visible
        show: function () {

            this.$el.css({
                visibility: 'hidden',
                display: 'block'
            });

            this.adjust();

            this.$el.css({
                visibility: 'visible'
            });

            return this;
        },
        //Hide it (not destroy)
        hide: function () {
            this.$el.css({
                display: 'none'
            });

            return this;
        },
        //Remove listeners
        onClose: function () {
            if (this.spinner instanceof Spinner) {
                this.spinner.stop();
                this.spinner = null;
            }
            window.removeEventListener('resize', this.adjust.bind(this), false);

            if (this.useScroll && this.scroll instanceof FTScroller) {
                this.scroll.destroy(true);
                this.scroll = null;
            }

            this.trigger('close');
        },
        onError: function (model, xhr) {
            var response = {};

            try {
                response = JSON.parse(xhr.responseText);
                console.log(response, 'on error');
                this.renderError(response.non_field_errors);
            } catch (e) {
                console.log(e, e.stack, e.message, arguments, 'An error occurred: Signup Model');
                this.renderError('An unexpected error has occurred.\nPlease try again later');
            }
        },

        onValidationError: function (model, errors) {
            console.log('validation error', arguments);
            var errs = [];
            var pairs = _.pairs(errors);

            _.each(pairs, function (item) {
                console.log(item, 'item');
                errs.push(item[1]); //Push the message
            });

            console.log(errs);

            this.renderError(errs).show();
        },

        /**
         * Removes the existing error messages.
         * @param {Stind/Array}
         * @returns {null}
         */
        clearError: function () {
            var form = (this.dom && this.dom.form) || $('#login-form');

            form.find('.error-container').addClass('hide').
            find('.alert').html('');
            form.find('.control-group').removeClass('error');
        },
        /**
         * Renders the error messages on the screen.
         * @param {Stind/Array}
         * @returns {null}
         */
        renderError: function (errs) {
            this.clearError();

            var errString = '';
            var form = (this.dom && this.dom.form) || $('#' + this.config.name);

            if (typeof errs === 'string') {
                errString = errs;
            } else {
                errString = errs.join('\n');
            }

            form.find('.error-container').removeClass('hide').
            find('.alert').html(errString);
            form.find('.control-group').addClass('error');

            return this;
        }
    });
});