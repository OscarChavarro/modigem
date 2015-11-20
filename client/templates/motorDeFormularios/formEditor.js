//============================================================================
Router.route("/formEditor", {
    name: "formEditor",
    loadingTemplate: "formEditorLoading",
    data: function () {
        return true;
    }
});

//============================================================================

Template.formEditor.events({
    /**
    Ejemplo de envío de identificadores de formulario al editor de formulario.
    Nótese que tras ejecutar esta función, el navegador realizará un salto
    a la URL del editor de formulario.
    */
    "click #setFormId": function(event, template) {
        var id = event.currentTarget.getAttribute("data-id");
        if ( valid(id) ) {
            Session.set("formId", id);
        }
    } 
});
