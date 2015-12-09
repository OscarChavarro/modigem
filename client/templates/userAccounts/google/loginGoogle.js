Template.loginGoogle.events({ 
    'click button': function(e) { 
        setTimeout(function(){
            if (Meteor.user()) {
            alert('Ya se encuentra una sesión abierta');
            }else{
                Meteor.loginWithGoogle();
            }
        },800);
        return false; 
    }
});
