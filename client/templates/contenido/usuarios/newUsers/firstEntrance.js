Template.firstEntrance.helpers({
    NEWUSER: function() {
        if (user2Role.find({user: Meteor.user()._id}).count()==0) {
            return true;
        }else{
			return false;
		}
	}   
});