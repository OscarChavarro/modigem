Meteor.publish('allUsers', function(){
	return users.find();
});