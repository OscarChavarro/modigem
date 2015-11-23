Template.currentuser.helpers({
    user: function() {
    	var uid = Meteor.userId();

    	if ( !valid(uid) ) {
    		return "NO DEFINIDO";
    	}

    	var u = Meteor.users.findOne(uid);

    	if ( !valid(u) ) {
    		return "NO ENCONTRADO";
    	}

        return u.username;
    }
});
