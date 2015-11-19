Template.addAdmin.events({ 
  'submit form': function(e) {
	   e.preventDefault();
    currentUser = $(e.target).find('[name=name]').val();
    rolUser	= $(e.target).find('[name=rol]').val();
	    if (rolUser==1){
			      userRol.insert({nameC:ADMINISTRATOR, nameSpa: currentUser});
        }
		if (rolUser==2){
                  userRol.insert({nameC:RESTAURATOR, nameSpa: currentUser});
	    }
		if (rolUser==3){
                  userRol.insert({nameC:COLLECTIONIST, nameSpa: currentUser});
	    }
	return false;
	}
	});