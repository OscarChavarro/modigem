//============================================================================
Router.route("/manageUsers", {
    name: "manageUsers",
    loadingTemplate: "manageUsersLoading",
    data: function () {
        return true;
    },
    waitOn: function() {
        var combine = {
            ready: function() {
                return Meteor.subscribe("userRole") && Meteor.subscribe("allUsers");
            }   
        };
        return combine;
    }
});

//============================================================================

Template.manageUsers.helpers({
    "allUsers": function() {
        var cursor = Meteor.users.find();
        return Meteor.users.find();
    }
});
