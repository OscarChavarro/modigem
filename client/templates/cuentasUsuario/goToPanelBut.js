 Template.goToPanelBut.events({ 
'click button': function(e) { 
		       setTimeout(function(){
                 if (Meteor.user()) {
			     if (adminList.find({newAdmin: Meteor.user().username}).count() + 1 > 1){
                  Router.go('adminPanel');
			     }else{
				Router.go('userPanel');
			     }
                 }
	},800);
    return false; 
  }
});