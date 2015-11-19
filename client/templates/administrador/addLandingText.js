Template.addLandingText.events({ 
  'submit form': function(e) {
	   e.preventDefault();
    newLandingText = $(e.target).find('[name=landingText]').val(); 
    landingText.insert({newLandingText});
	return false;
	}
	});