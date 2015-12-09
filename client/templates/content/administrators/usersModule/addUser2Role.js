Template.addUser2Role.events({ 
    'submit form': function(e) {
        e.preventDefault();
        userId2Up = $(e.target).find('[name=name]').val();
        rolUser     = $(e.target).find('[name=rol]').val();
        if(user2Role.find({user: Meteor.users.findOne({_id: userId2Up})._id}).count()+1>1){
        //Remover al usuario del rol anterior    
        }
        //else{ ASIGNARLE NUEVO ROL
        if (rolUser==1){
            user2Role.insert({rol: userRole.findOne({nameC: 'ADMINISTRATOR'})._id, user: Meteor.users.findOne({_id: userId2Up})._id});
        }
        if (rolUser==2){
            user2Role.insert({rol: userRole.findOne({nameC: 'RESTORER'})._id, user: Meteor.users.findOne({_id: userId2Up})._id});
        }
        //}
        return false;
    }
});
