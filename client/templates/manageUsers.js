
Router.route("manageUsers", {name: "manageUsers",
    data: function() {
    	console.log("En cada ruta hay una funcion que se llama siempre al inicio y se llama data");
    	Meteor.subscribe("allUsers");
    }
});

Template.manageUsers.helpers({
	usersList: function () {
		console.log("aca estoy ****");
		return users.find();
	}
});