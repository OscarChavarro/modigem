//============================================================================
Router.route("/formEditor", {
    name: "formEditor",
    loadingTemplate: "formEditorLoading",
    data: function () {
        //datasetLanguageFiltered = language.find();
        return true;
    }
    /*,
    waitOn: function() {
        languageHandle = Meteor.subscribe("language");
        return languageHandle;
    }*/
});

//============================================================================
