Template.usersTable.helpers({
    USER: function() {
        return Meteor.users.find(); //Solo disponible para el admin
                                           
    }
});