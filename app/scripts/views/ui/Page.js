/*global $, Backbone, aspect, console, define, FTScroller, i18n */
define([
	'templates.jade/page',
	'templates.jade/empty',
	'config',
	'views/ui/Spinner'
], function(
	pageTemplate,
	empty,
	config,
	Spinner){
	'use strict';
	return Backbone.View.extend({
		id: 'page',
		className: 'page w-header',
		template: pageTemplate,
		footer: '',
		header: {
			center: 'Default...'
		},
		scroll: false,
		useScroll: true,
		dialog: false,
		spinner: false,//Spinner view TODO: Move to initialization for reusage
		content: empty,
		loadingLabel: (function(){return i18n['__indicator__...'].replace('__indicator__', i18n.Loading);})(),
		events: {
			'tap [data-target]': 'openPage',
			'tap .back': 'back',
			'tap .home': 'home'
		},
		i18n: false,
		initialize: function(){
			//TODO: Fix this, does not make much sense right now
			aspect.add(this, 'render', this.afterRender.bind(this), 'after');
			//Refresh scroll container after these methods
			/*if(this.useScroll){
				aspect.add(this, this.refreshAfterMethods, this.scrollRefresh.bind(this), 'after');
			}*/
			console.log('initialize page', this.loadingLabel);
			document.addEventListener('touchmove', this.preventDefault.bind(this), false);
			this.spinner = new Spinner();
			return this;
		},

		onClose: function(){
			aspect.remove(this, 'render', this.afterRender.bind(this), 'after');
			if(this.useScroll && this.scroll instanceof FTScroller){
				this.scroll.destroy();
				this.scroll = null;
			}

			if(this.spinner && this.spinner instanceof Spinner){
				this.spinner.close();
                this.spinner = null;
			}

			if(this.dialog instanceof Dialog){
                this.dialog.close();
                this.dialog = null;
            }

			document.removeEventListener('touchmove', this.preventDefault.bind(this), false);
			aspect.remove(this, 'render', this.afterRender);
		},
		//Shortcuts
		back: function(event){
			event.preventDefault();
			console.log('back', this, window.referrer);
			window.history.back();
		},
		//Home shortcut
		home: function(event){
			event.preventDefault();
			console.log(config.routes.home, this, window.referrer);
			Backbone.history.navigate('/', {trigger: true});
		},

		render: function(){
			//Page initial state
			var data = {
				id: this.id,
				className: this.className,
				title: '',
				header: this.header || '',
				content: this.content() || '',
				footer: this.footer || '',
				loadingIndicator: this.loadingIndicator || ''
			};

			var $body = $('body');
			var page = this.template(data);

			$body.find('[data-role="page"]').remove();
			$body.append(page);
			console.log(data, 'data');
			//Cache the page
			var $page = this.$page = $('#' + data.id);

			this.setElement($page[0]);
			//No fancy stuff for the momment
			$page.show();
			//Cache te container region for easy access
			this.$content = $('[data-role=scroller]>.content');
			this.$scroller = $('#scroller');

			console.log('before ftscroll', this.useScroll);
			if(this.useScroll){
				this.enableScroll();
			}

			//Remove booting indicator at the end
			if($('#boot-loader').length){$('#boot-loader').remove();}
			console.log('render page', data);
			//Return instance to allow chainable calls
			return this;
		},

		preventDefault: function(e){
			e.preventDefault();
		},

		afterRender: function(){
			//Prevent auto focus on form elements
			this.$page.focus();
		},
		/**
		* Method setTitle
		*
		* Finds the current page title and
		* sets the given string as its html content
		*
		*/
		setTitle: function(title){
			//Do you title stuff here
			console.log('set title', title);
			try{
				console.log('title', this.$page.find('#title'));
				this.$page.find('#title').html(title);
			}catch(e){
				console.log('error', e);
			}
		},
		/**
		* Method showLoading
		*
		* @param String label
		*
		* Puts the spinner instance to spin
		* sends the given label if any,
		* sends the loadingLabel otherwise
		*/
		showLoading: function(label){
			console.log('Show loading', this.loadingLabel);
			label = label || this.loadingLabel;
			console.log('label', label);
			this.spinner.spin(label);

			return this;
		},

		/**
		* Method hideLoading
		*
		* Stops the spinner instance (spin.js)
		*/
		hideLoading: function(){
			this.spinner.stop();

			return this;
		},

		/**
		*
		* Method openPage
		*
		* @param Object event
		*
		* Open page based on the target provided by the node
		* if target starts with / means it is absolute
		* target will be relative otherwise
		*
		*/
		openPage: function(event){
			console.log('open page');
            event.preventDefault();
            var $target = $(event.currentTarget);
            var page = $target.attr('data-target');
            var current = Backbone.history.fragment;
            //If is not absolute
            if(page[0] !== '/') page = current + '/' + page;

            console.log('open page', page);
            //Go to page
            Backbone.history.navigate(page, {trigger: true});
        },
        //Prepare emtpy page settings, content is rendered in template
        emptyPage: function(){
        	this.$page.addClass('empty');
            this.$page.find('#secondary').empty();
        },
        //Remove empty page settings, start the scroll again
        enableScroll: function(){
        	if(this.scroll instanceof FTScroller){
        		//Already enabled
        		return this.scroll;
        	}

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

			return this.scroll;
        }
	});
});