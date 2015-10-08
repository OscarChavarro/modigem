Template.informacion.helpers({
	Iam: function(){
		  return registeredUsers.find({username: Meteor.user().username}).fetch();
	}
	
});