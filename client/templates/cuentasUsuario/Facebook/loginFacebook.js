Template.loginFacebook.events({ 
    'click button': function(e) { 
        setTimeout(function(){
            if (Meteor.user()) {
            alert('Ya se encuentra una sesión abierta');
            }else{
				Meteor.loginWithFacebook();
			}
        },800);
        return false; 
    }
});