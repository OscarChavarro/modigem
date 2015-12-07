Template.restorerPanel.helpers({
    RESTORER: function() {
        if (user2Role.find({rol: userRole.findOne({nameC: 'RESTORER'})._id, user: Meteor.user()._id}).count() +1 > 1) {
            return true;
        }else{
            return false;
        }
    }   
});
