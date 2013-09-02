/* global Backbone, $, _, define */
define(
	['spinjs', 'templates.jade/spinner', 'config'],
	function(Spinner, template, config){
		return Backbone.View.extend({
			id: 'spinner',
			template: template,
			rendered: false,
			options: {
				label: 'loading...',
				appendTo: 'body'
			},
			appendTo: 'body',//Must be valid selector
			config: config.spinner,
			spinning: false,
			initialize: function(opts){
				//Override append target
				if(opts && opts.appendTo) this.appendTo = opts.appendTo;

				this.spinner = new Spinner(_.extend({}, this.config));
			},
			onClose: function(){
				this.spinner.stop();
				this.spinner = null;
			},
			render: function(){
				var data = _.extend(this.options, {
					id: this.id
				});
				var $content = this.template(data);
				this.setElement($content);

				this.spinner.spin(this.$el.find('.loading-indicator-spinner')[0]);

				$(this.appendTo).append(this.$el);

				this.rendered = true;
				this.spinning = true;
				return this.$el;
			},
			stop: function(){
				this.spinner.stop();
				this.$el.hide();
				this.spinning = false;

				return this.$el;
			},
			spin: function(label){
				console.log('label in spinner', label);
				label = label || this.options.label;
				if(!this.rendered){this.render();}
				else if(!this.spinning){
					this.spinner.spin(this.$el.find('.loading-indicator-spinner')[0]);
					this.spinning = true;
				}

				this.$el.find('.loading-indicator-label').text(label);
				this.$el.show();

				return this.$el;
			}
		});
	}
);