Template.defaultPanel.helpers({
    DEFAULT: function() {
        if (user2Role.find({rol: userRole.findOne({nameC: 'DEFAULT'})._id, user: Meteor.user()._id}).count() +1 > 1) {
            return true;
        }else{
			return false;
		}
	}   
});