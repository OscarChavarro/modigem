Template.home.helpers({
 ayudante2: function() {
  if (Meteor.userId()===null) {
 return true;
            }else{
 return false;
 }
 }
});