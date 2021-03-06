// global app namespace
window.App = {}

$.get('client.html', function(res) {
	App.clientTemplate = res;
});

//Backbone Client model
App.Client = Backbone.Model.extend({
	//override AJAX save method, don't need it/errors
	save: function() { return null; }
});

// Backbone Classroom collection
App.Classroom = Backbone.Collection.extend({
	model: App.Client
});

// Classroom View
App.ClassroomView = Backbone.View.extend({
	el: "#dropzone",
	initialize: function() {
		this.render();
	},
	render: function() {
		this.collection.each(function(model){
            App.clientView = new App.ClientView({model:model});
            this.$el.append(App.clientView.el);
    	}, this);
	}
});
// Client View
App.ClientView = Backbone.View.extend({
	tagName: null, // <--- super hacky way to stop backbone wrapping this in an extra div
	initialize: function() {
		this.render();
	},
	render: function() {
		var template = Handlebars.compile(App.clientTemplate);
		this.$el.html(template(this.model.toJSON()));
	}
});