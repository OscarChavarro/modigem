Template.addAdmin.events({ 
  'submit form': function(e) {
	   e.preventDefault();
    newAdmin = $(e.target).find('[name=name]').val(); 
    adminList.insert({newAdmin});
	return false;
	}
	});