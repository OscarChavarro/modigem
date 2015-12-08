Template.usersTable.helpers({
    USER: function() {
        return Meteor.users.find(); //Solo disponible para el admin
                                           
    },
	/**
	this es un user
	*/
	showUserName: function()
	{
		if ( valid(this.username) ) {
			return this.username;
		}
		else if ( valid(this.profile.name) ) {
			return this.profile.name;
		}
		return "No tiene un nombre válido";
	}
});

Template.usersTable.events({
	/**
	En la tabla que lista los usuarios dentro del panel
	de aministración de usuario, se muestra un botón
	"¡Eliminar!" para cada usuario. Cuando el usuario 
	oprime uno de esos botones se llama esta función.
	Nótese que cada botón contiene un identificador
	que contiene el _id de la base de datos del usuario
	a eliminar.
	*/
    "submit #deleteUser": function(event, template)
	{
		event.preventDefault();
		var id = event.target.delete.id;
		Meteor.users.remove(id);
	}	
});
