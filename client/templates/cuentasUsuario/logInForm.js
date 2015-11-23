  Template.loginForm.events({ 
  'submit form': function(e) { 
    e.preventDefault();
    logemail = $(e.target).find('[name=email]').val();  
        logpassword = $(e.target).find('[name=password]').val();
        Meteor.loginWithPassword(logemail, logpassword,);
    setTimeout(function(){
    if (Meteor.user()) {
                           if (adminList.find({newAdmin: Meteor.user().username}).count() + 1 > 1){
                Router.go('adminPanel');
                           }else{
                                Router.go('userPanel');
                           }
            }else{
                                Router.go('home');
                                alert('invalid email/password');
                        }
        },800);
        return false;
  }
});