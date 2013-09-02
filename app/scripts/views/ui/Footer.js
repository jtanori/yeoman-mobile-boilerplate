/* global Backbone, config, define */
define(
	[
		'templates.jade/footer',
		'config'
	],
	function(template, config){
	return Backbone.View.extend({
		config: config.footer,
		template: template,
		events: {
			//'click li a': 'activatePage',
			'tap li>div': 'activatePage'
		},
		currentGroup: '',
		initialize: function(){
			return this.render();
		},
		render: function(){
			var content = this.template({footer: this.config}).trim();

			this.setElement(content);
			this.$items = this.$el.find('li');
			
			return this;
		},

		onClose: function(){
			console.log(this, 'footer close');
		},
		//Mark button as selected
		setGroup: function(group){
			var $target = this.$items.find('[data-page-id=' + group + ']');

			this.$items.find('.active').removeClass('active');
			$target.addClass('active');
			//Set group
			this.currentGroup = group;

			return this;
		},

		clearGroup: function(){
			//Mark page as active in footer
			this.$el
				.find('li .active').removeClass('active');
			//Set no group
			this.currentGroup = '';
		},
		//Navigate to page
		activatePage: function(e){
			var $target = $(e.currentTarget);
			var page = $target.attr('data-page-id');

			try{
				this.setGroup(page);

				Backbone.history.navigate(page, {trigger: true});

			}catch(e){
				console.log(e.message, 'error', e.stack);
			}
		}
	});
});