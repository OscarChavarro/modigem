//============================================================================
Router.route("/manageUsers", {
    name: "manageUsers",
    loadingTemplate: "manageUsersLoading",
    data: function () {
    	dbAllUsers = Meteor.users.find();

        return true;
    }
});

//============================================================================

Template.manageUsers.helpers({
	"allUsers": function() {
		return dbAllUsers;
	}
});