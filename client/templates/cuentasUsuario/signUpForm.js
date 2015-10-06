  Template.signUpForm.events({ 
  'submit form': function(e) { 
    e.preventDefault();
    logemail = $(e.target).find('[name=email]').val(); 
    logname =  $(e.target).find('[name=name]').val(); 	
	logpassword = $(e.target).find('[name=password]').val();
	lognombre = $(e.target).find('[name=nombre]').val();
	logedad = $(e.target).find('[name=edad]').val();
	logfoto = $(e.target).find('[name=foto]').val();
	logdireccion = $(e.target).find('[name=direccion]').val();
	logprofesion = $(e.target).find('[name=profesion]').val();
	logabout = $(e.target).find('[name=about]').val();
	/*Se terminan de guardar las variables temporales*/
	registeredUsers.insert({email: logemail, username: logname, nombre: lognombre, edad: logedad, foto: logfoto, direccion: logdireccion, profesion: logprofesion, about: logabout});
	/*Se llena el formulario del usuario en la coleccion de usuarios registrados*/
	Accounts.createUser({email: logemail, username: logname, password: logpassword});
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
	/*Se crea el usuario y se redirecciona a su panel de trabajo*/
  }
});

    
