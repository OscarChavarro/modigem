Template.loginTwitter.events({ 
    'click button': function(e) { 
        setTimeout(function(){
            if (Meteor.user()) {
            alert('Ya se encuentra una sesión abierta');
            }else{
                Meteor.loginWithTwitter();
            }
        },800);
        return false; 
    }
});