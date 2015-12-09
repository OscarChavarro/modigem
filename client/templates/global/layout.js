Template.layout.helpers({
    ayudante: function() {
        if (Meteor.userId()===null) {
            return true;
        }else{
            return false;
        }
    }
});