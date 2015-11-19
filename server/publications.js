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
Meteor.publish('allFiles1', function(){
	return cfs._tempstore.chunks.find();
});
Meteor.publish('allFiles2', function(){
	return cfs.images.filerecord.find();
});
Meteor.publish('allFiles3', function(){
	return cfs_gridfs._tempstore.chunks.find();
});
Meteor.publish('allFiles4', function(){
	return cfs_gridfs._tempstore.files.find();
});
Meteor.publish('allUserRole', function(){
	return userRole.find();
});
Meteor.publish('allUser2Role', function(){
	return user2Role.find();
});