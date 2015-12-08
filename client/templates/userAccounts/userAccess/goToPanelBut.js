Template.goToPanelBut.events({ 
    'click button': function(e) { 
        setTimeout(function(){
            if (Meteor.user()) {
                if (user2Role.find({rol: userRole.findOne({nameC: 'ADMINISTRATOR'})._id, user: Meteor.user()._id}).count() +1> 1){
                    Router.go('adminPanel');
                }else{
                    Router.go('userPanel');
                }
            }
        },800);
        return false; 
    }
});
Template.goToPanelBut.helpers({
	fbName: function() {
        if (Meteor.user().services.facebook) {
            return Meteor.user().services.facebook.name;
        }
    }
    fbPic: function() {
        if (Meteor.user().services.facebook) {
            return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
        }
    }
	
});