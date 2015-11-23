Template.informacionAll.helpers({
    Iam: function(){
        return registeredUsers.find().fetch();
    }
});