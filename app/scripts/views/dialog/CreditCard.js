/* global define, i18n, aspect, $, Backbone */
define([
    'views/ui/Dialog',
    'views/ui/Spinner',
    'templates.jade/dialog_credit_card',
    'templates.jade/empty'
], function (Dialog, Spinner, content, empty) {
    'use strict';

    return Dialog.extend({
        id: 'credit-card-view',
        className: 'dialog al-left',
        config: {
            title: '',
            content: empty(),
            buttons: [{
                id: 'js-dialog-setup',
                className: 'btn-secondary',
                href: "#",
                icon: {
                    name: "checkmark"
                },
                text: i18n.Add
            }, {
                id: 'js-dialog-close',
                className: 'btn-link js-dialog-close',
                href: "#",
                text: i18n.Cancel
            }],
            name: "credit-card-form",
            header: true,
            form: true,
            spinnerLabel: i18n['Working...']
        },
        events: (function () {
            var events = _.extend({}, Dialog.prototype.events, {
                'tap #js-dialog-setup': 'doSetup',
                'submit #credit-card-form': 'doSetup',
                'tap #cvv-help': 'showPopover'
            });

            return events;
        })(),
        useScroll: true,
        initialize: function (options) {
            switch (options.action) {
            case 'edit':
                this.config.title = i18n['Edit Card'];
                break;
            case 'add':            		
            case 'setup':
                this.config.title = i18n['Add Credit Card'];
                this.config.buttons[1].text = i18n['Later'];
                break;
            }
        
            this.config.content = content(this.model.toJSON());
            this.user = options.user;
            
            
            Dialog.prototype.initialize.apply(this, arguments);

            this.model.on('sync', this.onSync, this);
            this.model.on('error', this.onError, this);
            this.model.on('validated:invalid', this.onValidationError, this);
            //Reposition after these events
            aspect.add(this, ['clearError', 'renderError'], this.show.bind(this), 'after');
            aspect.add(this, ['renderError, onSync'], this.hideLoadingIndicator.bind(this), 'before');
        },
        afterRender: function () {
            console.log('after dialog render credit card');
        },
        onClose: function () {
            if (this.spinner) {
                this.hideLoadingIndicator();
            }

            this.model.unbind('sync', this.onSync, this);
            this.model.unbind('error', this.onError, this);
            this.model.unbind('validated:invalid', this.onValidationError, this);
            //Reposition after these events
            aspect.remove(this, ['clearError', 'renderError'], this.show.bind(this), 'after');
            aspect.remove(this, ['renderError, onSync'], this.hideLoadingIndicator.bind(this), 'before');
        },
        doSetup: function () {
            console.log('do setup');
            var $form = this.dom.form;

            var data = {
                type: $form.find('[name=type]').val(),
                number: ($form.find('[name=number]').val()),
                cvv: ($form.find('[name=cvv]').val()),
                name: ($form.find('[name=name]').val()),
                expirationDateMonth: $form.find('[name=expirationDateMonth]').val(),
                expirationDateYear: $form.find('[name=expirationDateYear]').val()
            };

            console.log(data, 'credit card data');
            //TODO: Save to server
            this.model.save(data,{
            	beforeSend: function () {
                    this.showLoadingIndicator();
                }.bind(this)                
            });
            
        },
        onError:function(model, xhr){
        	if (this.spinner) {this.hideLoadingIndicator();}
        	
        	 var response = {};
        	 
             response = JSON.parse(JSON.parse(xhr.responseText));
             
             
             
             var errs = [];
             errs.push(response.response); //Push the message
             this.renderError(errs).show(); 
        },
        onSync: function (model, response) {            
        		
        	console.log(this.user);
        	
        		var jsonReponse = JSON.parse(response);
        		
        		this.user.set("creditCard_token",jsonReponse.braintree_token);
        		this.user.set("creditCard_id",jsonReponse.braintree_id);
        		this.user.set("creditCard_uid",jsonReponse.braintree_uid);        		
        		this.user.set("creditCard_model",this.model.toJSON());
        		
            this.close();
            
            if(this.options.action == "setup"){
            		Backbone.history.navigate('#home', {
                		trigger: true,
                		replace: true
            		});            
            }
        },
        showPopover: function (e) {
            console.log('show popover');
        }
    });
});