Template.deleteUser.events({ 
    'submit form': function(e) {
        e.preventDefault();
        userId = $(e.target).find('[name=name]').val();
        Meteor.users.remove(userId);
        return false;
    }
});