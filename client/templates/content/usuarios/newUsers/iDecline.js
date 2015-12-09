Template.iDecline.events({ 
    'click button': function(e) { 
        Meteor.users.remove(Meteor.user()._id);
        Router.go('home');
        return false; 
    }
});
