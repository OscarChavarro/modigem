console.log("Publicando colecciones MongoDB a Minimongo");

Meteor.publish('allPiece', function(){
	return piece.find();
});
Meteor.publish('allImageClons', function(){
	return imageClon.find();
});
Meteor.publish('allImages', function(){
	return images.find();
});
Meteor.publish('allRegistered', function(){
	return registeredUsers.find();
});
Meteor.publish('allLandingTexts', function(){
	return landingText.find();
});
Meteor.publish('allAdmins', function(){
	return adminList.find();
});
//Meteor.publish('allUsers', function(){
//	return users.find();
//});
Meteor.publish('allUserRole', function(){
	return userRole.find();
});
Meteor.publish('allUser2Role', function(){
	return user2Role.find();
});

Meteor.publish(
    "serviceRequestForm", function() {
        return serviceRequestForm.find();
    }
);
Meteor.publish(
    "serviceRequestFormQuery", function() {
        return serviceRequestFormQuery.find();
    }
);
Meteor.publish(
    "serviceRequestForm2Query", function() {
        return serviceRequestForm2Query.find();
    }
);
Meteor.publish(
    "serviceRequestQueryType", function() {
        console.log("Publicando información de la colección serviceRequestQueryType");
        return serviceRequestQueryType.find();
    }
);
Meteor.publish(
    "serviceRequestAnswerOption", function() {
        return serviceRequestAnswerOption.find();
    }
);
