Meteor.startup(function () {
    Meteor.methods({
	deleteUserById: function(userId) {
            Meteor.users.remove(userId);
        }
	});
});