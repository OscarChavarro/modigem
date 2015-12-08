Template.checkboxForUserRole.helpers({
    checkIfActive: function(u, r)
    {
        var filter = {userId: u, userRoleId: r};
        var check = user2role.findOne(filter);

        if ( valid(check) ) {
            return "checked";
        }
        return "unchecked";
    }
});

Template.usersTable.helpers({
    USER: function() {
        return Meteor.users.find(); //Solo disponible para el admin
                                           
    },
	getArrayOfUserProfiles: function()
	{
		return userRole.find().fetch();
	},
	/**
	Calcula el nombre del usuario a partir de un elemento de la
	tabla users en el paquete Meteor.Accounts.
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
	},
	/**
	Calcula el correo del usuario a partir de un elemento de la
	tabla users en el paquete Meteor.Accounts.
	this es un user
	*/
	showUserEmail: function()
	{
		if ( valid(this.emails) &&
  		     valid(this.emails[0]) && 
			 valid(this.emails[0].address) ) {
			return this.emails[0].address;
		}
		else if ( valid(this.services) &&
		          valid(this.services.facebook) &&
				  valid(this.services.facebook.email) ) {
			return this.services.facebook.email + " (facebook)";
		}
		return "No tiene un email válido";
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
