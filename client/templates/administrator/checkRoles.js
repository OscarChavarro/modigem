Template.checkRoles.helpers({
    roledUser: function() {
        return user2Role.find(); //roledUser debe ser un arreglo de dos elementos que contenga el nameSpa de userRole
                                 //y el username de Meteor.users(), relacionados mediante user2Role
    }
});