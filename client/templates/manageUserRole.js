Router.route("manageUserRole", {name: "manageUserRole"});

Template.manageUserRole.events({
	'submit .newUser': function(event){
		event.preventDefault();
		 var username = $('[name=username]').val();
         var password = $('[name=password]').val();
		 Accounts.createUser({
            username: username ,
            password: password 
  		}, function(e) { 
  			console.log("Funcion asincronica: " + e); 
  		});
	}
});

