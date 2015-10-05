  Template.signUpForm.events({ 
  'submit form': function(e) { 
    e.preventDefault();
    logemail = $(e.target).find('[name=email]').val(); 
    logname = $(e.target).find('[name=name]').val(); 	
	logpassword = $(e.target).find('[name=password]').val();
	Accounts.createUser({email: logemail, username: logname, password: logpassword});
		       if (Meteor.user()) {
			   if (adminList.find({newAdmin: Meteor.user().username}).count() + 1 > 1){
                Router.go('adminPanel');
			   }else{
				Router.go('userPanel');
			   }
               }
    return false; 
  }
});
