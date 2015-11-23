Template.addAdmin.events({ 
  'submit form': function(e) {
           e.preventDefault();
    currentUser = $(e.target).find('[name=name]').val();
    rolUser     = $(e.target).find('[name=rol]').val();
            if (rolUser==1){
                              user2Role.insert({rol: userRole.findOne({nameC: 'ADMINISTRATOR'})._id, user: currentUser})
        }
                if (rolUser==2){
                  user2Role.insert({nameC:RESTAURATOR, nameSpa: currentUser});
            }
        return false;
        }
        });