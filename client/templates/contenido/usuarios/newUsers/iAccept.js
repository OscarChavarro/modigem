Template.iAccept.events({ 
    'click button': function(e) { 
        user2Role.insert({rol: userRole.findOne({nameC: 'DEFAULT'})._id, user: Meteor.userId()});
        Router.go('userPanel');
        return false; 
    }
});
