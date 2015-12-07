Template.adminPanel.helpers({
    ADMIN: function() {
        if (user2Role.find({rol: userRole.findOne({nameC: 'ADMINISTRATOR'})._id, user: Meteor.user()._id}).count()==0) {
            return false;
        }else{
            return true;
        }
    }
});