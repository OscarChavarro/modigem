Template.signUpForm.events({ 
    'submit form': function(e) { 
        e.preventDefault();
        logemail = $(e.target).find('[name=email]').val(); 
        logname =  $(e.target).find('[name=name]').val();   
        logpassword = $(e.target).find('[name=password]').val();
        /*Se llena el formulario del usuario en la coleccion de usuarios registrados*/
        Accounts.createUser({email: logemail, username: logname, password: logpassword});
        setTimeout(function(){
        Router.go('/');
        },4000);
    return false; 
        /*Se crea el usuario y se redirecciona a su panel de trabajo*/
    }
});

    
