Template.userPanel.helpers({
    USER: function() {
        if (Meteor.userId()===null) {
            return false;
        }else{
            return true;
        }
    }
 
});