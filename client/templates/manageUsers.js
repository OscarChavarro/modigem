
Router.route("manageUsers", {name: "manageUsers",
    data: function() {
    	console.log("Llamado a la función data, de inicialización de ruta manageUsers");
    	Meteor.subscribe("allUsers");
    }
});

Template.manageUsers.helpers({
	usersList: function () {
		console.log("Llamado a la función usersList");
		return users.find();
	}
});