Template.logoutbutton.events({  
    'click button': function() {
        Meteor.logout(function() {
        // Ruta después de salir de la cuenta
        Router.go('home');
        });
        return;
    }
});