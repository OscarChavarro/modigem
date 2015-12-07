Template.actualLandingText.helpers({
    landingText: function() {
        return landingText.find().fetch()[landingText.find().count()-1];
    }
});
