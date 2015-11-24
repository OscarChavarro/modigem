Template.iDecline.events({ 
    'click button': function(e) { 
        //Funcion para borrar la actual cuenta de usuario de la colección Meteor.users()
		Router.go('home');
        return false; 
    }
});