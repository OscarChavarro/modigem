Template.currentuser.helpers({
  user: function() {
    return Meteor.user().username;
  }
});