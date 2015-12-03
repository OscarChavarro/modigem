Template.goToPanelBut.events({ 
    'click button': function(e) { 
        setTimeout(function(){
            if (Meteor.user()) {
                if (user2Role.find({rol: userRole.findOne({nameC: 'ADMINISTRATOR'})._id, user: Meteor.user()._id}).count() +1> 1){
                    Router.go('adminPanel');
                }else{
                    Router.go('userPanel');
                }
            }
        },800);
        return false; 
    }
});